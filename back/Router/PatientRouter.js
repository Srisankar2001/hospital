const express = require("express")
const  upload = require("../Middleware/upload")
const {patientController} = require("../Controller/PatientController")

const router = express.Router()

router.get("/getAll",patientController.getAll)

router.post("/get",patientController.get)
router.post("/register",upload.single("image"),patientController.register)

module.exports = router