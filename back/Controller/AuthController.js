const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.SECRET_KEY;

const verifyAuth = async (req,res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(200).json({ success: false , message:"token not found"})
    }
    jwt.verify(token,jwtSecretKey,(err,decode)=>{
        if(err){
            return res.status(200).json({success: false ,  err})
        }else{
            res.status(200).json({success:true,data:decode})
        }
    })
}

module.exports = {verifyAuth}