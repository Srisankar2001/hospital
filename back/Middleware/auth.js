const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ success: false, message: "Token is missing" })
    }
    
    jwt.verify(token,jwtSecretKey,(err,decode)=>{
        if(err){
            return res.status(400).json({ success: false, message: "Error in token" })
        }else{
            if(decode.role === 'ADMIN'){
                next()
            }else{
                return res.status(401).json({ success: false, message: " Unauthorized Request" });
            }
        }
    })
}

const verifyDoctor = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ success: false, message: "Token is missing" })
    }
    
    jwt.verify(token,jwtSecretKey,(err,decode)=>{
        if(err){
            return res.status(400).json({ success: false, message: "Error in token" })
        }else{
            if(decode.role === 'DOCTOR'){
                next()
            }else{
                return res.status(401).json({ success: false, message: " Unauthorized Request" });
            }
        }
    })
}

const verifyPatient = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ success: false, message: "Token is missing" })
    }
    
    jwt.verify(token,jwtSecretKey,(err,decode)=>{
        if(err){
            return res.status(400).json({ success: false, message: "Error in token" })
        }else{
            if(decode.role === 'PATIENT'){
                next()
            }else{
                return res.status(401).json({ success: false, message: " Unauthorized Request" });
            }
        }
    })
}

const auth = {
    verifyAdmin,
    verifyDoctor,
    verifyPatient
}

module.exports = {auth}