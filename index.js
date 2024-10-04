// index.js

import {startScraper} from './src/scrapers/index.js';
import connectDB, {closeDBConnection} from "./src/database/config.js";


async function main() {
    const startTime = performance.now(); // Start timing

    try {
        await connectDB();

        await startScraper();

        return 0;
    } catch (error) {
        console.error('Error during scraping tasks:', error);
    } finally {
        await closeDBConnection();

        const endTime = performance.now(); // End timing
        const totalTime = endTime - startTime; // Calculate total time
        console.log(`Total time taken: ${totalTime.toFixed(2)} milliseconds`);

        process.exit(0); // Exit the process
    }
}

main();
