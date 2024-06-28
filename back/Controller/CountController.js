const User = require("../Model/UserModel")
const Appointment = require("../Model/AppointmentModel")

const getUser = async (req, res) => {
    try {
        const adminCount = await User.countDocuments({ role: "ADMIN" });
        const doctorCount = await User.countDocuments({ role: "DOCTOR" });
        const patientCount = await User.countDocuments({ role: "PATIENT" });

        return res.status(200).json({ success: true, data: { adminCount, doctorCount, patientCount } });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getAppointment = async (req, res) => {
    try {
        const completeCount = await Appointment.countDocuments({ status: "completed" });
        const scheduledCount = await Appointment.countDocuments({ status: "scheduled" });
        const cancelCount = await Appointment.countDocuments({ status: "cancelled" });

        return res.status(200).json({ success: true, data: { completeCount, scheduledCount, cancelCount } });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getAppointmentCount = async (req, res) => {
    const { dates } = req.body;
    if(!dates){
        return res.status(400).json({ success: false, message: "Input necessary dates" });
    }
    const data = [];

    try {
        const promises = dates.map(async (item) => {
            const completeCount = await Appointment.countDocuments({ status: "completed", date: item });
            const scheduledCount = await Appointment.countDocuments({ status: "scheduled", date: item });
            const cancelCount = await Appointment.countDocuments({ status: "cancelled", date: item });

            return { completeCount, scheduledCount, cancelCount, date: item };
        });

        const results = await Promise.all(promises);
        results.forEach(result => data.push(result));

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const countController = {
    getUser,
    getAppointment,
    getAppointmentCount
}

module.exports = { countController }