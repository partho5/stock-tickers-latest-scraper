// index.js

import { scrapingSources } from './src/scrapers/config.js';
import { getScrapingTasks } from './src/scrapers/index.js';


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

        results.forEach(result => {
            if (result.data) {
                console.log(`${result.label} tickers:`, result.data);
            } else {
                console.log(`${result.label} failed with error:`, result.error);
            }
        });
    } catch (error) {
        console.error('Error during scraping tasks:', error);
    }
}

main();
