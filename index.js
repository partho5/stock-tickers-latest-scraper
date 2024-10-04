// index.js

import {startScraper} from './src/scrapers/index.js';
import connectDB, {closeDBConnection} from "./src/database/config.js";


async function main() {
    try {
        await connectDB();

        await startScraper();

        return 0;
    } catch (error) {
        console.error('Error during scraping tasks:', error);
    } finally {
        closeDBConnection();
        process.exit(0); // Exit the process
    }
}

main();
