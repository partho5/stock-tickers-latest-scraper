# Stock Ticker Scraper

This project is a **web scraper** that collects the most active and valuable stock tickers from various financial websites and combines them into a **unique, ordered list**. The scraper fetches data from several sources in parallel, ensures the results are ordered by priority, and saves the unique tickers to a database.

## Features

- **Multiple Sources**: Scrapes stock tickers from various financial websites, including:
  - TradingView (most active and most valuable)
  - Yahoo Finance (most active)
  - FinViz (most active)
  - Wall Street Journal (most active)
  - Stock Analysis (most active)
- **Parallel Scraping**: All scraping tasks are run in parallel to optimize performance.
- **Error Handling**: Each scraper handles errors gracefully, ensuring that a failure in one source doesn't affect the entire process.
- **Unique Results**: The stock tickers collected are combined and filtered to ensure only unique tickers are saved.
- **Database Storage**: Saves the unique list of tickers to a database with a timestamp.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/partho5/stock-tickers-latest-scraper.git
   cd stock-ticker-scraper
