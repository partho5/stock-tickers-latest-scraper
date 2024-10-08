// src/database/config.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export const closeDBConnection = async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
}

export default connectDB;
