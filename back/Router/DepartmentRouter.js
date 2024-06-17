const express = require("express")
const  upload = require("../Middleware/upload")
const {departmentController} = require("../Controller/DepartmentController")

const router = express.Router()

router.get("/getAll",departmentController.getAll)

router.post("/get",departmentController.get)
router.post("/register",upload.single("image"),departmentController.register)

router.put("/updateWithImage",upload.single("image"),departmentController.updateWithImage)
router.put("/updateWithoutImage",departmentController.updateWithoutImage)

module.exports = router