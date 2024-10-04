// index.js

import {startScraper} from './src/scrapers/index.js';
import connectDB from "./src/database/config.js";


async function main() {

    try {
        // Establish MongoDB connection first
        await connectDB();

        await startScraper();

        return 0;
    } catch (error) {
        console.error('Error during scraping tasks:', error);
    }
}

main();
