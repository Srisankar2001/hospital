const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/.test(v);
            },
            message: props => `${props.value} is not a valid time format (HH:MM)!`
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/.test(v);
            },
            message: props => `${props.value} is not a valid time format (HH:MM)!`
        }
    },
    timeInterval: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return Number.isInteger(v) && v > 0;
            },
            message: props => `${props.value} must be a positive integer!`
        }
    }
});

scheduleSchema.index({ doctor: 1, day: 1 }, { unique: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
