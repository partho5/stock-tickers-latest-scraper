// src/scrapers/index.js

import {stockAnalysisMostActive} from "./stockAnalysis.js";
import {scrapingSources} from "./config.js";
import {uniqueList} from "../utils/strings.js";
import {saveToDatabase} from "../services/tickerService.js";
import {todayName} from "../utils/timing.js";


function getScrapingTasks(tasks) {
    const scrapingMap = {
        // tradingViewMostActive,
        // tradingViewMostValuable,
        // yahooFinanceMostActive,
        // finVizMostActiveHTTP,
        // wsjMostActive,
        stockAnalysisMostActive,
    };

    return tasks.map(task => ({
        label: task.label,
        scrapeFunction: scrapingMap[task.label] || (() => { throw new Error(`Scraping function for ${task.label} not registered in ${getCurrentFilename()}`); }),
        url: task.url
    }));
}


export const startScraper = async () => {
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
    // console.log('Unique tickers:', uniqueTickers);

    // Serialize the unique tickers to a string
    const tickersString = uniqueTickers.join(',');

    saveToDatabase(tickersString, todayName());
}


const getCurrentFilename = () => {
    return __filename; // This will give you the full path of the current file
};