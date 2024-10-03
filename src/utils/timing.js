export const randomDelay = (min, max) => {
    // Returns a random delay time between min and max (inclusive) milliseconds
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const delay = async (ms) => {
    // Wraps setTimeout in a promise to make it awaitable
    return new Promise(resolve => setTimeout(resolve, ms));
}