// src/scrapers/index.js

import {stockAnalysisMostActive} from "./stockAnalysis.js";
import {scrapingSources} from "./config.js";
import {uniqueList} from "../utils/strings.js";
import {saveToDatabase} from "../services/tickerService.js";
import {todayName} from "../utils/timing.js";
import {wsjMostActive} from "./wsj.js";
import {finVizMostActiveHTTP} from "./finViz.js";
import {yahooFinanceMostActive} from "./yahooFinance.js";
import {tradingViewMostActive, tradingViewMostValuable} from "./tradingView.js";
import {nasdaqMostActive} from "./nasdaq.js";


function getScrapingTasks(tasks) {
    const scrapingMap = {
        tradingViewMostActive,
        tradingViewMostValuable,
        yahooFinanceMostActive,
        finVizMostActiveHTTP,
        wsjMostActive,
        stockAnalysisMostActive,
        //nasdaqMostActive,
    };

    return tasks.map(task => ({
        label: task.label,
        scrapeFunction: scrapingMap[task.label] || (() => { throw new Error(`Scraping function for ${task.label} not registered.`); }),
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
    console.log('Unique tickers count:', uniqueTickers.length);

    // Serialize the unique tickers to a string
    const tickersString = uniqueTickers.join(',');

    await saveToDatabase(tickersString, todayName());
}