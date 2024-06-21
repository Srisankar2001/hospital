const express = require("express")
const {scheduleController} = require("../Controller/ScheduleController")

const router = express.Router()

router.post("/get",scheduleController.get)
router.post("/set",scheduleController.set)


module.exports = router