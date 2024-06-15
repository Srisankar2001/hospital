const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
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
    },
})

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient