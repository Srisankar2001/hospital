const express = require("express")
const  upload = require("../Middleware/upload")
const {patientController} = require("../Controller/PatientController")

const router = express.Router()

router.get("/getAll",patientController.getAll)

router.post("/get",patientController.get)
router.post("/getFull",patientController.getFull)
router.post("/getByUserId",patientController.getByUserId)
router.post("/register",upload.single("image"),patientController.register)

router.put("/updateWithImage",upload.single("image"),patientController.updateWithImage)
router.put("/updateWithoutImage",patientController.updateWithoutImage)
router.put("/block",patientController.block)
router.put("/unblock",patientController.unblock)

module.exports = router