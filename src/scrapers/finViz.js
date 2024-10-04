// src/scrapers/finViz.js

import { chromium } from 'playwright';

import axios from 'axios';
import * as cheerio from 'cheerio';
import {delay, randomDelay} from "../utils/timing.js";
import {getRandomUserAgent} from "../utils/strings.js"; // Use named import for cheerio

export const finVizMostActiveHTTP = async (url) => {
    let attempt = 0;
    while (attempt < 5) {
        try {
            const delayTime = randomDelay(10 * 1000, 15 * 1000);
            await delay(delayTime);

            const response = await axios.get(url, {
                headers: {
                    'User-Agent': getRandomUserAgent()
                }
            });

            if (response.status !== 200) {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`);
            }

            const $ = cheerio.load(response.data);
            const tdData = [];
            $('td[align="left"] a.tab-link').each((index, element) => {
                tdData.push($(element).text().trim());
            });

            console.log(`finVizMostActive ${url}`, tdData);

            return tdData;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                attempt++;
                const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
                console.log(`Received 429. Waiting for ${waitTime} ms before retrying...`);
                await delay(waitTime);
            } else {
                console.error(`Error finVizMostActiveHTTP: ${error.message}`);
                return [];
            }
        }
    }
};




/* Often experiences timeout error */
export const finVizMostActive = async (url) => {
    const browser = await chromium.launch({ headless: true }); // Set to false for debugging
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log('Navigating to:', url);
    await page.goto(url);
    console.log('Page loaded successfully');


    try {
        // Scroll multiple times to ensure all content is loaded
        for (let i = 0; i < 3; i++) {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(2000); // Wait for content to load
        }

        await page.waitForSelector('td[align="left"] a.tab-link', { timeout: 60*1000 });

        const tdData = await page.$$eval('td[align="left"] a.tab-link', elements =>
            elements.map(a => a.textContent.trim())
        );

        console.log('Extracted data:', tdData);
        return tdData;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        await browser.close();
    }
};