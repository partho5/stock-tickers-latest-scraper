// src/services/tickerService.js

import Ticker from '../models/Ticker.js';

// Function to save the tickers string into the database
export const saveToDatabase = async (tickersString, identifier) => {
    try {
        // Use findOneAndUpdate with upsert: true to update or create a document
        const updatedTicker = await Ticker.findOneAndUpdate(
            { identifier }, // Find document by identifier
            { tickers: tickersString }, // Update the tickers string
            { new: true, upsert: true } // Return the updated document and create if not found
        );
        console.log(`Saved tickers: ${tickersString} with identifier: ${identifier}`);
        return updatedTicker._id; // Return the MongoDB document ID
    } catch (error) {
        console.error('Error saving tickers:', error);
    }
};


// Function to fetch tickers string by its MongoDB _id
export const getTickersById = async (id) => {
    try {
        const ticker = await Ticker.findById(id); // Find the document by _id
        if (ticker) {
            console.log(`Fetched tickers: ${ticker.tickers}`);
            return ticker.tickers; // Return the stored tickers string
        } else {
            console.log('Ticker not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
};
