// src/database/models/Ticker.js

import mongoose from 'mongoose';

const tickerSchema = new mongoose.Schema({
    tickers: { type: String, required: true },
    identifier: { type: String, required: true },

});

const Ticker = mongoose.model('Ticker', tickerSchema, 'stockTickers');
export default Ticker;
