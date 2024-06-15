const express = require("express")
const {login} = require("../Controller/LoginController")

const router = express.Router()

router.post("/",login)

module.exports = router