const mongoose = require("mongoose")

const sequenceSchema = new mongoose.Schema({
    doctor : {
        type : Number,
        default : 0
    },
    patient : {
        type : Number,
        default : 0
    },
    admin : {
        type : Number,
        default : 0
    }
})

const Sequence = mongoose.model("Sequence",sequenceSchema)

module.exports = Sequence