const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique:true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['ADMIN','DOCTOR','PATIENT'],
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
    active:{
        type : Boolean,
        default : true
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User