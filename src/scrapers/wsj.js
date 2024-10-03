// src/scrapers/wsj.js

import { chromium } from 'playwright';
import {extractTickerListFromBracket} from "../utils/strings.js";

export const wsjMostActive = async (url) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the URL
    await page.goto(url);

    // Wait for the table or relevant content to load
    await page.waitForSelector('tr'); // Adjust selector if needed

    // Extract the text from the first <td> of each <tr>
    const firstTdTexts = await page.$$eval('tr', rows =>
        rows.map(row => {
            const firstTd = row.querySelector('td'); // Find the first <td>
            return firstTd ? firstTd.textContent.trim() : null; // Return trimmed text or null
        }).filter(text => text !== null) // Filter out null values
    );

    // Close the browser
    await browser.close();

    return extractTickerListFromBracket(firstTdTexts);
};
