// src/scrapers/stockAnalysis.js

import { chromium } from 'playwright';
import {randomDelay} from "../utils/timing.js";


export const stockAnalysisMostActive = async (url) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the URL
    await page.goto(url);

    // Wait for the initial data to load
    await page.waitForSelector('td.sym.svelte-eurwtr');

    const allTickers = [];

    // Scrape data for the first page
    const scrapeData = async () => {
        const tickerElements = await page.$$eval('td.sym.svelte-eurwtr a', anchors =>
            anchors.map(anchor => anchor.textContent.trim())
        );
        allTickers.push(...tickerElements);
        console.log("Tickers from this page:", tickerElements); // Log tickers for the current page
    };

    // Scrape the first page
    await scrapeData();

    // Click the "Next" button 10 times
    for (let i = 0; i < 2; i++) {
        try {
            // Check if the "Next" button is available and contains the text "Next"
            const nextButton = await page.$('button.controls-btn:has(span:has-text("Next"))');
            if (nextButton) {
                await nextButton.click();
                // Wait for the new data to load
                await page.waitForSelector('td.sym.svelte-eurwtr', { timeout: 5000 });
                // Scrape data after clicking
                await scrapeData();

                // Wait for a random delay between clicks
                const delay = randomDelay(1000, 3000); // Random delay between 1 and 3 seconds
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // console.log("No more pages to navigate.");
                break; // Exit the loop if there's no "Next" button
            }
        } catch (error) {
            console.error(`Failed to click next on attempt ${i + 1}:`, error);
            break; // Exit the loop if there's an error (e.g., no more pages)
        }
    }

    // Close the browser
    await browser.close();

    // Log all unique tickers once at the end
    const uniqueTickers = [...new Set(allTickers)]; // Return unique tickers
    console.log("Unique tickers:", uniqueTickers);

    return uniqueTickers;
};
