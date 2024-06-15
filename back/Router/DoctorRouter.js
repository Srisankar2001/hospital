const express = require("express")
const  upload = require("../Middleware/upload")
const {doctorController} = require("../Controller/DoctorController")

const router = express.Router()

router.get("/getAll",doctorController.getAll)

router.post("/get",doctorController.get)
router.post("/register",upload.single("image"),doctorController.register)

module.exports = router