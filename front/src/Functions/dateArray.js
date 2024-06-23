export const dateArray = () => {
    const today = new Date();
    const dates = [];

    for (let i = 1; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const formattedDate = date.toISOString().split('T')[0];
        dates.push(formattedDate)
    }

    return dates
}