const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../Model/UserModel")
const Patient = require("../Model/PatientModel")
const {generateId} = require("../Function/IDgenerator")

const register = async (req, res) => {
    const { name, age, dob, gender, contactNumber, address, email, password } = req.body
    const image = req.file.filename

    if (!name || !age || !dob || !gender || !contactNumber || !address || !email || !password || !image) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        const hash = await bcrypt.hash(password, 10)

        if (!hash) {
            return res.status(500).json({ success: false, message: "Error in hashing password" })
        }

      
        const id = await generateId('patient')

        if(!id){
            return res.status(500).json({ success: false, message: "Error in DB" })
        }

        const patientUser = new User({
            id:id,
            name : name,
            email:email,
            password:hash,
            role:'PATIENT'
        })

        const savedPatientUser = await patientUser.save()

        const patient = new Patient({
            id:savedPatientUser.id,
            user:savedPatientUser._id,
            name: name,
            age: age,
            dob: dob,
            gender: gender,
            contactNumber: contactNumber,
            address: address,
            image: image
        })

        const savedPatient = await patient.save()

        if (savedPatient) {
            return res.status(200).json({ success: true, message: "Patient created successfully" })
        }
        return res.status(400).json({ success: false, message: "Patient creation failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}

const getAll = async(req,res)=>{
    try{
        const patients = await Patient.find({})
        return res.status(200).json({success:true,data:patients})
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const get = async(req,res)=>{
    const {_id} = req.body

    if(!_id){
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid patient ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try{
        const patient = await Patient.findById(id)
        if(!patient){
            return res.status(400).json({ success: false, message: "Patient not found" })
        }
        return res.status(400).json({ success: true, data: patient })
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getByUserId = async(req,res)=>{
    const {id} = req.body

    if(!id){
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    try{
        const patient = await Patient.findOne({id:id})
        if(!patient){
            return res.status(400).json({ success: false, message: "Patient not found" })
        }
        return res.status(200).json({ success: true, data: patient })
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const block = async(req,res)=>{
    const {_id} = req.body
    if(!_id){
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid patient ID" });
    }
    const id = new mongoose.Types.ObjectId(_id)
    try{
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        if (!user.active) {
            return res.status(400).json({ success: false, message: "Patient is already blocked" });
        }

        user.active = false;

        const savedUser = await user.save();

        if (!savedUser) {
            return res.status(400).json({ success: false, message: "Patient block failed" });
        }
        return res.status(200).json({ success: true, message: "Patient blocked successfully" });
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const unblock = async(req,res)=>{
    const {_id} = req.body
    if(!_id){
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }
    const id = new mongoose.Types.ObjectId(_id)
    try{
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        if (user.active) {
            return res.status(400).json({ success: false, message: "Patient is already unblocked" });
        }

        user.active = true;

        const savedUser = await user.save();

        if (!savedUser) {
            return res.status(400).json({ success: false, message: "Patient unblock failed" });
        }
        return res.status(200).json({ success: true, message: "Patient unblocked successfully" });
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}



const patientController = {
    register,
    get,
    getByUserId,
    getAll,
    block,
    unblock
}

module.exports = {patientController}