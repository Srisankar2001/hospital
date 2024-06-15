const express = require("express")
const {verifyAuth} = require("../Controller/AuthController")

const router = express.Router()

router.post("/",verifyAuth)

module.exports = router