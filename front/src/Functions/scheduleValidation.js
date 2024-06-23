export const  validate = (input) => {
    let error = {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    }

    const validateDay = (dayInput) => {
        const { startTime, endTime, intervalTime } = dayInput;

        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        if (startTotalMinutes >= endTotalMinutes) {
            return "End time must be later than start time";
        }

        if (Number(intervalTime) < 20 || Number(intervalTime) > 60) {
            return "Interval time must be in 20 mins to 1 hr";
        }

        if (startTotalMinutes + Number(intervalTime) > endTotalMinutes) {
            return "End time must allow for at least one interval";
        }

        return "";
    }

    error.monday = input.monday.endTime !== "00:00" ? validateDay(input.monday) : ""
    error.tuesday = input.tuesday.endTime !== "00:00" ? validateDay(input.tuesday) : ""
    error.wednesday = input.wednesday.endTime !== "00:00" ? validateDay(input.wednesday) : ""
    error.thursday = input.thursday.endTime !== "00:00" ? validateDay(input.thursday) : ""
    error.friday = input.friday.endTime !== "00:00" ? validateDay(input.friday) : ""
    error.saturday = input.saturday.endTime !== "00:00" ? validateDay(input.saturday) : ""
    error.sunday = input.sunday.endTime !== "00:00" ? validateDay(input.sunday) : ""

    return error;
}
