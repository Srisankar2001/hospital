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
    const { _id, monday , tuesday , wednesday , thursday , friday , saturday , sunday } = req.body;

    if (!_id || !monday || !tuesday || !wednesday || !thursday || !friday || !saturday || !sunday) {
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

        const schedule = await Schedule.findOne({ doctor: id });
        if (!schedule) {
            return res.status(400).json({ success: false, message: "Schedule not found" });
        }


        schedule.monday = monday
        schedule.tuesday = tuesday
        schedule.wednesday = wednesday,
        schedule.thursday = thursday,
        schedule.friday = friday,
        schedule.saturday = saturday,
        schedule.sunday = sunday
       
        await schedule.save();
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