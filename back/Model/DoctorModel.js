const mongoose = require("mongoose");
const Department = require("./DepartmentModel");
const Schedule = require("./ScheduleModel");

const doctorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    }
});

doctorSchema.post('save', async function (doc) {
    try {
        if (doc.department) {
            const department = await Department.findById(doc.department).exec();
            department.doctors.push(doc._id);
            await department.save();
        }

        const schedule = new Schedule({ doctor: doc._id });
        const savedSchedule = await schedule.save();

        await Doctor.findByIdAndUpdate(doc._id, { schedule: savedSchedule._id });
    } catch (error) {
        console.error('Error in post save hook: ', error);
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
