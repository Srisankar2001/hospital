const mongoose = require("mongoose")
const Schedule = require("../Model/ScheduleModel")
const Doctor = require("../Model/DoctorModel")

const get = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const schedule = await Schedule.find({ doctor: id })

        if (!schedule) {
            return res.status(400).json({ success: false, message: "Schedule not found" })
        }
        return res.status(200).json({ success: true, data: schedule })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
const set = async (req, res) => {
    const { _id, scheduleData } = req.body;

    if (!_id || !scheduleData) {
        return res.status(400).json({ success: false, message: "Input necessary data" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const id = new mongoose.Types.ObjectId(_id);

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(400).json({ success: false, message: "Doctor not found" });
        }

        const existingSchedules = await Schedule.find({ doctor: id });

        // Collect existing schedule IDs
        const existingScheduleIds = existingSchedules.map(schedule => schedule._id.toString());

        // Iterate over scheduleData to update or create new schedules
        for (const item of scheduleData) {
            const existingSchedule = existingSchedules.find(schedule => schedule.day === item.day);

            if (existingSchedule) {
                existingSchedule.startTime = item.startTime;
                existingSchedule.endTime = item.endTime;
                existingSchedule.timeInterval = item.timeInterval;
                await existingSchedule.save();

                // Remove existing schedule ID from the list of existing IDs
                const index = existingScheduleIds.indexOf(existingSchedule._id.toString());
                if (index !== -1) {
                    existingScheduleIds.splice(index, 1);
                }
            } else {
                const newSchedule = new Schedule({
                    doctor: id,
                    day: item.day,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    timeInterval: item.timeInterval
                });

                const savedSchedule = await newSchedule.save();
                doctor.schedules.push(savedSchedule._id);
            }
        }

        // Delete schedules that were not updated or created (no longer in scheduleData)
        if (existingScheduleIds.length > 0) {
            await Schedule.deleteMany({ _id: { $in: existingScheduleIds } });
            // Remove deleted schedules from doctor's schedules array
            doctor.schedules = doctor.schedules.filter(scheduleId => !existingScheduleIds.includes(scheduleId.toString()));
        }

        await doctor.save();
        return res.status(200).json({ success: true, message: "Schedule updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const scheduleController = {
    get,
    set
}

module.exports = {scheduleController}