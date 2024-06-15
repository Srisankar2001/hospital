const Department = require("../Model/DepartmentModel")

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
            return res.status(200).json({ success: true, message: "department created successfully" })
        }
        return res.status(400).json({ success: false, message: "department creation failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getAll = async(req,res)=>{
    try{
        const departments = await Department.find({})
        return res.status(200).json({success:true,data:departments})
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
        const department = await Department.findById({id})
        if(!department){
            return res.status(400).json({ success: false, message: "department not found" })
        }
        return res.status(400).json({ success: true, message: department })
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const departmentController = {
    register,
    get,
    getAll
}

module.exports = {departmentController}