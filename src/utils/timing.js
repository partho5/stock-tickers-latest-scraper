export const randomDelay = (min, max) => {
    // Returns a random delay time between min and max (inclusive) milliseconds
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const delay = async (ms) => {
    // Wraps setTimeout in a promise to make it awaitable
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const todayName = () => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    // Get the current day
    const today = new Date().getDay();
    const currentDay = daysOfWeek[today]; // Get the day name in lowercase

    return currentDay;
}