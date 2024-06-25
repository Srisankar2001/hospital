const Department = require("../Model/DepartmentModel")
const mongoose = require("mongoose")
const register = async (req, res) => {
    const { name, description } = req.body
    const image = req.file.filename

    if (!name || !description || !image) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    try {
        const department = await Department.findOne({name:name})

        if (department) {
            return res.status(400).json({ success: false, message: "Department already exists" })
        }

        const newDepartment = new Department({
            name: name,
            description:description,
            image: image
        })

        const savedDepartment = await newDepartment.save()

        if (savedDepartment) {
            return res.status(200).json({ success: true, message: "Department created successfully" })
        }
        return res.status(400).json({ success: false, message: "Department creation failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateWithImage = async (req, res) => {
    const { _id , name, description } = req.body
    const image = req.file.filename
    if ( !_id || !name || !description || !image) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid department ID" });
    }
    const id = new mongoose.Types.ObjectId(_id)
    try {
        const department = await Department.findOneAndUpdate({_id:id},{name:name,description:description,image:image},{new:true})

        if (department) {
            return res.status(200).json({ success: true , message: "Department updated successfully" })
        }else{
            return res.status(400).json({ success: false, message: "Department update failed" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateWithoutImage = async (req, res) => {
    const { _id , name, description } = req.body
    if ( !_id || !name || !description) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid department ID" });
    }
    const id = new mongoose.Types.ObjectId(_id)
    try {
        const department = await Department.findOneAndUpdate({_id:id},{name:name,description:description},{new:true})

        if (department) {
            return res.status(200).json({ success: true , message: "Department updated successfully" })
        }else{
            return res.status(400).json({ success: false, message: "Department update failed" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getAll = async(req,res)=>{
    try{
        const departments = await Department.find({}).populate('doctors')
        return res.status(200).json({success:true,data:departments})
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const get = async(req,res)=>{
    const {_id} = req.body

    if(!_id){
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    try{
        const department = await Department.findById(_id)
        if(!department){
            return res.status(400).json({ success: false, message: "department not found" })
        }
        return res.status(200).json({ success: true, data: department })
    }catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const departmentController = {
    register,
    updateWithImage,
    updateWithoutImage,
    get,
    getAll
}

module.exports = {departmentController}