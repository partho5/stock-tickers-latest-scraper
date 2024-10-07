// src/scrapers/index.js

import { stockAnalysisMostActive } from "./stockAnalysis.js";
import { scrapingSources } from "./config.js";
import { uniqueList } from "../utils/strings.js";
import { saveToDatabase } from "../services/tickerService.js";
import { todayName } from "../utils/timing.js";
import { wsjMostActive } from "./wsj.js";
import { finVizMostActiveHTTP } from "./finViz.js";
import { yahooFinanceMostActive } from "./yahooFinance.js";
import { tradingViewMostActive, tradingViewMostValuable } from "./tradingView.js";
// import { nasdaqMostActive } from "./nasdaq.js";

// Scraping map for order priority
const scrapingMap = {
  tradingViewMostActive,
  yahooFinanceMostActive,
  finVizMostActiveHTTP,
  wsjMostActive,
  tradingViewMostValuable,
  stockAnalysisMostActive,
  // nasdaqMostActive,
};

// Get the scraping tasks by matching tasks with the scraping map
function getScrapingTasks(tasks) {
  return tasks.map(task => ({
    label: task.label,
    scrapeFunction:
      scrapingMap[task.label] || (() => { throw new Error(`Scraping function for ${task.label} not registered.`); }),
    url: task.url
  }));
}

export const startScraper = async () => {
  const scrapingFunctions = getScrapingTasks(scrapingSources);
  let results = [];

  /**
   * Scraping functions run in parallel
   */
  results = await Promise.all(
    scrapingFunctions.map(async (task) => {
      const { label, scrapeFunction } = task;
      try {
        const data = await scrapeFunction(task.url);
        return { label, data };
      } catch (error) {
        console.error(`Error fetching data for ${label}:`, error);
        return { label, error: error.message };
      }
    })
  );

  // Filter out failed results and only keep successful ones
  const validResults = results.filter(result => result.data);

  // Sort valid results based on the order in the scrapingMap
  validResults.sort((a, b) => {
    const orderA = Object.keys(scrapingMap).indexOf(a.label);
    const orderB = Object.keys(scrapingMap).indexOf(b.label);
    return orderA - orderB;
  });

  // Combine all ticker arrays from valid results into one
  const allTickers = validResults.map(result => result.data);

  // Flatten and get unique tickers
  const uniqueTickers = uniqueList(allTickers.flat());
  console.log('Unique tickers count:', uniqueTickers.length);

  // Serialize the unique tickers to a string
  const tickersString = uniqueTickers.join(',');

  // Save the unique tickers to the database
  await saveToDatabase(tickersString, todayName());
};
