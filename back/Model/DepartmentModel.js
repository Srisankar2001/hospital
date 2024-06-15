const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description: {
        type : String,
        default: ""
    },
    doctors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctor'
    }],
    image : {
        type : String
    },
    createAt : {
        type : Date,
        default : Date.now
    }
})

const Department = mongoose.model("Department",departmentSchema)

module.exports = Department