export const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return weekdays[dayOfWeek];
};