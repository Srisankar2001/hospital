const express = require("express")
const  upload = require("../Middleware/upload")
const {doctorController} = require("../Controller/DoctorController")

const router = express.Router()

router.get("/getAll",doctorController.getAll)
router.get("/getAllFull",doctorController.getAllFull)

router.post("/get",doctorController.get)
router.post("/getFull",doctorController.getFull)
router.post("/register",upload.single("image"),doctorController.register)

router.put("/updateWithImage",upload.single("image"),doctorController.updateWithImage)
router.put("/updateWithoutImage",doctorController.updateWithoutImage)
router.put("/block",doctorController.block)
router.put("/unblock",doctorController.unblock)

module.exports = router