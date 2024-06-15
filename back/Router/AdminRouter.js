const express = require("express")
const  upload = require("../Middleware/upload")
const {adminController} = require("../Controller/AdminController")

const router = express.Router()
router.get("/getAll",adminController.getAll)

router.post("/get",adminController.get)
router.post("/register",upload.single("image"),adminController.register)

module.exports = router