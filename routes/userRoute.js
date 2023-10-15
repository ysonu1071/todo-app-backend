const express = require("express");
const { registerUser, loginUser, sendOtpForForgetPassword, saveNewPassword} = require("../controller/userController");

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/sendotp", sendOtpForForgetPassword);
route.post("/savenewpassword", saveNewPassword);



module.exports = route;