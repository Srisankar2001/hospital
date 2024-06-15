const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../Model/UserModel")
const Doctor = require("../Model/DoctorModel")
const Department = require("../Model/DepartmentModel")
const {generateId} = require("../Function/IDgenerator")

const register = async (req, res) => {
    const { name, age, dob, gender, contactNumber, address, email, password , department } = req.body
    const image = req.file.filename

    if (!name || !age || !dob || !gender || !contactNumber || !address || !email || !password || !department || !image) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(department)) {
        return res.status(400).json({ success: false, message: "Invalid department ID" });
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

        const departmentVerify = await Department.findById(department)
        if(!departmentVerify){
            return res.status(400).json({ success: false, message: "Department not found" })
        }

        const id = await generateId('doctor')

        if(!id){
            return res.status(500).json({ success: false, message: "Error in DB" })
        }

        const doctorUser = new User({
            id:id,
            name : name,
            email:email,
            password:hash,
            role:'DOCTOR'
        })

        const savedDoctorUser = await doctorUser.save()

        const doctor = new Doctor({
            id:savedDoctorUser.id,
            user:savedDoctorUser._id,
            department: new mongoose.Types.ObjectId(department),
            name: name,
            age: age,
            dob: dob,
            gender: gender,
            contactNumber: contactNumber,
            address: address,
            image: image
        })

        const savedDoctor = await doctor.save()

        if (savedDoctor) {
            return res.status(200).json({ success: true, message: "Doctor created successfully" })
        }
        return res.status(400).json({ success: false, message: "Doctor creation failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error:error.message })
    }
}

const getAll = async(req,res)=>{
    try{
        const doctors = await Doctor.find({})
        return res.status(200).json({success:true,data:doctors})
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const get = async(req,res)=>{
    const {id} = req.body

    if(!id){
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    try{
        const doctor = await Doctor.findOne({id:id})
        if(!doctor){
            return res.status(400).json({ success: false, message: "Doctor not found" })
        }
        return res.status(400).json({ success: true, message: doctor })
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const doctorController = {
    register,
    get,
    getAll
}

module.exports = {doctorController}