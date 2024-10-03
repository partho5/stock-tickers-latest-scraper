

export const extractTickerListFromBracket = (data) => {
    return data.map(item => {
        const match = item.match(/\((.*?)\)/);
        return match ? match[1] : null;
    }).filter(Boolean); // Removes any null values if no match is found
}