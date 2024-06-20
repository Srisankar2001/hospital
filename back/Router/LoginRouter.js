const express = require("express")
const {login,logout} = require("../Controller/LoginController")

const router = express.Router()

router.post("/",login)
router.get("/",logout)
module.exports = router