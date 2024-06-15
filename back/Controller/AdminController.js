const bcrypt = require("bcrypt")
const User = require("../Model/UserModel")
const Admin = require("../Model/AdminModel")
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

        const id = await generateId('admin')

        if(!id){
            return res.status(500).json({ success: false, message: "Error in DB" })
        }

        const adminUser = new User({
            id:id,
            name : name,
            email:email,
            password:hash,
            role:'ADMIN'
        })

        const savedAdminUser = await adminUser.save()

        const admin = new Admin({
            id:savedAdminUser.id,
            user:savedAdminUser._id,
            name: name,
            age: age,
            dob: dob,
            gender: gender,
            contactNumber: contactNumber,
            address: address,
            image: image
        })

        const savedAdmin = await admin.save()

        if (savedAdmin) {
            return res.status(200).json({ success: true, message: "Admin created successfully" })
        }
        return res.status(400).json({ success: false, message: "Admin creation failed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error",error:error})
    }
}

const getAll = async(req,res)=>{
    try{
        const admins = await Admin.find({})
        return res.status(200).json({success:true,data:admins})
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
        const admin = await Admin.findOne({id:id})
        if(!admin){
            return res.status(400).json({ success: false, message: "Admin not found" })
        }
        return res.status(400).json({ success: true, message: admin })
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const adminController = {
    register,
    get,
    getAll
}

module.exports = {adminController}