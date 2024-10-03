// src/scrapers/finViz.js

import { chromium } from 'playwright';

import axios from 'axios';
import * as cheerio from 'cheerio';
import {delay, randomDelay} from "../utils/timing.js"; // Use named import for cheerio

export const finVizMostActiveHTTP = async (url) => {
    try {
        console.log('Fetching data from:', url);
        // Introduce a random delay to prevent 429 error
        const delayTime = randomDelay(5*1000, 7*1000);
        console.log(`Waiting for ${delayTime} ms before next request...`);
        await delay(delayTime);

        // Set headers to mimic a real browser
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch data. Status code: ${response.status}`);
        }

        console.log('Page fetched successfully');

        // Load the HTML into cheerio (like BeautifulSoup in Python)
        const $ = cheerio.load(response.data);

        // Extract the data using the provided selector
        const tdData = [];
        $('td[align="left"] a.tab-link').each((index, element) => {
            tdData.push($(element).text().trim());
        });

        console.log('Extracted data:', tdData);
        return tdData;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return [];
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