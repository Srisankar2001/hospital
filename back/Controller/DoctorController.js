const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../Model/UserModel")
const Doctor = require("../Model/DoctorModel")
const Department = require("../Model/DepartmentModel")
const Appointment = require("../Model/AppointmentModel")
const Schedule = require("../Model/ScheduleModel")
const { generateId } = require("../Function/IDgenerator")

const register = async (req, res) => {
    const { name, age, dob, gender, contactNumber, address, email, password, department } = req.body
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
        if (!departmentVerify) {
            return res.status(400).json({ success: false, message: "Department not found" })
        }

        const id = await generateId('doctor')

        if (!id) {
            return res.status(500).json({ success: false, message: "Error in DB" })
        }

        const doctorUser = new User({
            id: id,
            name: name,
            email: email,
            password: hash,
            role: 'DOCTOR'
        })

        const savedDoctorUser = await doctorUser.save()

        const doctor = new Doctor({
            id: savedDoctorUser.id,
            user: savedDoctorUser._id,
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
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateWithoutImage = async (req, res) => {
    const { _id, name, age, dob, gender, contactNumber, address } = req.body

    if (!_id || !name || !age || !dob || !gender || !contactNumber || !address) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const doctor = await Doctor.findOneAndUpdate({ _id: id }, { name: name, age: age, dob: dob, gender: gender, contactNumber: contactNumber, address: address })

        const savedDoctor = await doctor.save()

        if (savedDoctor) {
            return res.status(200).json({ success: true, message: "Doctor updated successfully" })
        }
        return res.status(400).json({ success: false, message: "Doctor update failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateWithImage = async (req, res) => {
    const { _id, name, age, dob, gender, contactNumber, address } = req.body
    const image = req.file.filename

    if (!_id || !name || !age || !dob || !gender || !contactNumber || !address || !image) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const doctor = await Doctor.findOneAndUpdate({ _id: id }, { name: name, age: age, dob: dob, gender: gender, contactNumber: contactNumber, address: address, image: image })

        const savedDoctor = await doctor.save()

        if (savedDoctor) {
            return res.status(200).json({ success: true, message: "Doctor updated successfully" })
        }
        return res.status(400).json({ success: false, message: "Doctor update failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getAll = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).populate('department', 'name').populate('user', 'active')
        return res.status(200).json({ success: true, data: doctors })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// const getAllFull = async (req, res) => {
//     try {
//         const doctors = await Doctor.find({})
//             .populate('department', 'name')
//             .populate('user', 'active')
//             .populate('appointments')
//             .populate('schedule')
//         return res.status(200).json({ success: true, data: doctors })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Internal Server Error" })
//     }
// }

const get = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const doctor = await Doctor.findById(id).populate('department', 'name')

        if (!doctor) {
            return res.status(400).json({ success: false, message: "Doctor not found" })
        }
        return res.status(200).json({ success: true, data: doctor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getByUserId = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    try {
        const doctor = await Doctor.findOne({ id: id }).populate({path:'appointments',populate:{path:'patient'}})
        if (!doctor) {
            return res.status(400).json({ success: false, message: "Doctor not found" })
        }
        return res.status(200).json({ success: true, data: doctor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getFull = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const doctor = await Doctor.findById(id)
            .populate('department', 'name')
            .populate({path:'appointments',populate:{path:'patient'}})
            .populate('schedule')
            .populate('user', 'active')

        if (!doctor) {
            return res.status(400).json({ success: false, message: "Doctor not found" })
        }
        return res.status(200).json({ success: true, data: doctor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const block = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }
    const id = new mongoose.Types.ObjectId(_id)
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (!user.active) {
            return res.status(400).json({ success: false, message: "Doctor is already blocked" });
        }

        user.active = false;

        const savedUser = await user.save();

        if (!savedUser) {
            return res.status(400).json({ success: false, message: "Doctor block failed" });
        }
        return res.status(200).json({ success: true, message: "Doctor blocked successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const unblock = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }
    const id = new mongoose.Types.ObjectId(_id)
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (user.active) {
            return res.status(400).json({ success: false, message: "Doctor is already unblocked" });
        }

        user.active = true;

        const savedUser = await user.save();

        if (!savedUser) {
            return res.status(400).json({ success: false, message: "Doctor unblock failed" });
        }
        return res.status(200).json({ success: true, message: "Doctor unblocked successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const doctorController = {
    register,
    updateWithImage,
    updateWithoutImage,
    get,
    getFull,
    getByUserId,
    getAll,
    // getAllFull,
    block,
    unblock
}

module.exports = { doctorController }