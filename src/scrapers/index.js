// src/scrapers/index.js

import { tradingViewMostActive, tradingViewMostValuable } from './tradingView.js';
import { yahooFinanceMostActive } from "./yahooFinance.js";
import {finVizMostActive, finVizMostActiveHTTP} from "./finViz.js";
import {wsjMostActive} from "./wsj.js";


export function getScrapingTasks(tasks) {
    const scrapingMap = {
        // tradingViewMostActive,
        // tradingViewMostValuable,
        // yahooFinanceMostActive,
        // finVizMostActiveHTTP,
        wsjMostActive,
    };

    return tasks.map(task => ({
        label: task.label,
        scrapeFunction: scrapingMap[task.label] || (() => { throw new Error(`Scraping function for ${task.label} not registered in ${getCurrentFilename()}`); }),
        url: task.url
    }));
}


const getCurrentFilename = () => {
    return __filename; // This will give you the full path of the current file
};