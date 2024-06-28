const express = require("express")
const {countController} = require("../Controller/CountController")

const router = express.Router()

router.get("/user",countController.getUser)
router.get("/appointment",countController.getAppointment)
router.post("/appointment",countController.getAppointmentCount)
module.exports = router