const express = require("express")
const  upload = require("../Middleware/upload")
const {departmentController} = require("../Controller/DepartmentController")

const router = express.Router()

router.get("/getAll",departmentController.getAll)

router.post("/get",departmentController.get)
router.post("/register",upload.single("image"),departmentController.register)

module.exports = router