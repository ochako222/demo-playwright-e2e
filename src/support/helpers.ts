const getDateRangeFromNow = (from: number, to: number) => {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + from);

    const finishDate = new Date(today);
    finishDate.setDate(today.getDate() + to);

    return {
        startDate,
        finishDate
    };
};

const getCurrentMonth = () => {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' }); // Get the full month name
    return month;
};

export const helpers = {
    getDateRangeFromNow,
    getCurrentMonth
};
