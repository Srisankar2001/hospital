const express = require("express")
const {appointmentController} = require("../Controller/AppointmentController")

const router = express.Router()

router.get("/getAll",appointmentController.getAll)
router.post("/create",appointmentController.create)
router.post("/cancel",appointmentController.cancel)
router.post("/complete",appointmentController.complete)



module.exports = router