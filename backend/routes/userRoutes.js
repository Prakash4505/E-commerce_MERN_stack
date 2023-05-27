const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser)
// register user url ==> http://localhost:4000/api/v1/register
router.route("/login").post(loginUser) 



module.exports = router;