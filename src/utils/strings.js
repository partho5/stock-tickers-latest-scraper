import {USER_AGENTS} from "../data/userAgents.js";

export const extractTickerListFromBracket = (data) => {
    return data.map(item => {
        const match = item.match(/\((.*?)\)/);
        return match ? match[1] : null;
    }).filter(Boolean); // Removes any null values if no match is found
}


export const uniqueList = (arrays) => {
    const combined = [].concat(...arrays); // Flatten the array of arrays
    return [...new Set(combined)]; // Use Set to filter out duplicates
};


export const getRandomUserAgent = () => {
    const randomIndex = Math.floor(Math.random() * USER_AGENTS.length);
    return USER_AGENTS[randomIndex];
}