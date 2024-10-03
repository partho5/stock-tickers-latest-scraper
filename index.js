// index.js

import { scrapingSources } from './src/scrapers/config.js';
import { getScrapingTasks } from './src/scrapers/index.js';
import {uniqueList} from "./src/utils/strings.js";


async function main() {

    try {
        const scrapingFunctions = getScrapingTasks(scrapingSources);

        const results = await Promise.all(scrapingFunctions.map(async (task) => {
            const { label, scrapeFunction } = task;
            try {
                const data = await scrapeFunction(task.url);
                return { label, data };
            } catch (error) {
                console.error(`Error fetching data for ${label}:`, error);
                return { label, error: error.message };
            }
        }));

        // Combine all data arrays into one unique array
        const allTickers = results
            .filter(result => result.data) // Filter out any failed results
            .map(result => result.data); // Extract the data arrays

        const uniqueTickers = uniqueList(allTickers); // Get unique tickers

        console.log('Unique tickers:', uniqueTickers);
    } catch (error) {
        console.error('Error during scraping tasks:', error);
    }
}

main();
