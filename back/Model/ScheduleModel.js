const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    monday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default: 0 }
    },
    tuesday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default: 0 }
    },
    wednesday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default: 0 }
    },
    thursday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default: 0 }
    },
    friday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default:0 }
    },
    saturday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default: 0 }
    },
    sunday: {
        startTime: { type: String, required: false, default: "00:00" },
        endTime: { type: String, required: false, default: "00:00" },
        intervalTime: { type: Number, required: false, default: 0 }
    }
}, { timestamps: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
