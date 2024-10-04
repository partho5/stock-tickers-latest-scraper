// src/scrapers/tradingView.js

import { chromium } from 'playwright';

const launchBrowser = async () => {
    return await chromium.launch({ headless: true });
};

export const tradingViewMostActive = async (url) => {
    const browser = await launchBrowser();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForSelector('a.apply-common-tooltip.tickerNameBox-GrtoTeat.tickerName-GrtoTeat');
    const tickerElements = await page.$$('a.apply-common-tooltip.tickerNameBox-GrtoTeat.tickerName-GrtoTeat');
    const tickers = await Promise.all(tickerElements.map(el => el.innerText()));
    console.log('tradingViewMostActive', tickers);
    await browser.close();
    return tickers;
};

export const tradingViewMostValuable = async (url) => {
    const browser = await launchBrowser();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForSelector('a.apply-common-tooltip.tickerNameBox-GrtoTeat.tickerName-GrtoTeat');
    const tickerElements = await page.$$('a.apply-common-tooltip.tickerNameBox-GrtoTeat.tickerName-GrtoTeat');
    const tickers = await Promise.all(tickerElements.map(el => el.innerText()));
    console.log('tradingViewMostValuable', tickers);
    await browser.close();
    return tickers;
};
