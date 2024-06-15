const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Model/UserModel")

const jwtSecretKey = process.env.SECRET_KEY

const login = async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({success:false,message:"Input all necessary data"})
    }

    try{
        const user = await User.findOne({email:email})

    if(!user){
        return res.status(400).json({success:false,message:"Email is not registerd"})
    }

    const result = await bcrypt.compare(password,user.password)

    if(!result){
        return res.status(401).json({success:false,message:"Password is incorrect"})
    }

    if(!user.active){
        return res.status(403).json({success:false,message:"Account is blocked"})
    }

    const payload = {
        id : user.id,
        name : user.name,
        role : user.role
    }
    const token = jwt.sign(payload,jwtSecretKey,{expiresIn:'1d'})

    if(!token){
        return res.status(500).json({success:false,message:"Error in creating token"})
    }

    res.cookie('token',token,{maxAge:60*60*12*1000,httpOnly:true})
    return res.status(200).json({success:true,message:"Login Successfull"})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal Server Error",error})
    }
}

module.exports = {login}