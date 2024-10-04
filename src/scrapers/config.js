// src/scrapers/config.js

import {finVizMostActiveHTTP} from "./finViz.js";
import {wsjMostActive} from "./wsj.js";

export const scrapingSources = [
    // { label: 'tradingViewMostActive', url: 'https://in.tradingview.com/markets/stocks-usa/market-movers-active/' },
    // { label: 'tradingViewMostValuable', url: 'https://in.tradingview.com/markets/stocks-usa/market-movers-large-cap/' },

    { label: 'yahooFinanceMostActive', url: 'https://finance.yahoo.com/markets/stocks/most-active/?guccounter=1&start=0&count=100' },

    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=21' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=41' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=61' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=81' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=101' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=121' },
    // { label: 'finVizMostActiveHTTP', url: 'https://finviz.com/screener.ashx?v=111&s=ta_mostactive&f=geo_usa&r=141' },
    //
    // { label: 'wsjMostActive', url: 'https://www.wsj.com/market-data/stocks/us/movers' },
    //
    // { label: 'stockAnalysisMostActive', url: 'https://stockanalysis.com/markets/active' },
];
