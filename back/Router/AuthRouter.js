const express = require("express")
const {verifyAuth} = require("../Controller/AuthController")

const router = express.Router()

router.get("/",verifyAuth)

module.exports = router