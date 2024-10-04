// src/scrapers/yahooFinance.js

import { chromium } from 'playwright';

export const yahooFinanceMostActive = async (url) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the URL
    await page.goto(url, {timeout: 120*1000});

    // Wait for the selector to ensure elements are loaded
    await page.waitForSelector('span.symbol.yf-1jpysdn');

    // Find all matching span elements with class "symbol yf-1jpysdn"
    const tickerElements = await page.$$eval('span.symbol.yf-1jpysdn', spans =>
        spans.map(span => span.textContent.trim())
    );

    // Close the browser
    await browser.close();

    console.log('yahooFinance', tickerElements);

    return tickerElements;
};
