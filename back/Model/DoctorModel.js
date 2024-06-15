const mongoose = require("mongoose")
const Department = require("./DepartmentModel");


const doctorSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    age: {
        type: Number,
        required: true
    },
    dob:{
        type: Date,
        required : true
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    image : {
        type : String
    }
})

doctorSchema.post('save', async function (doc) {
    const department = await Department.findById(doc.department).exec();
    department.doctors.push(doc._id);
    await department.save();
});


const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor