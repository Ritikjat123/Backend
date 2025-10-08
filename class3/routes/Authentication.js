// step-1
const express = require("express");

//step-2
const router = express.Router();

//step-3
const { Signup, VerifyAccount, Login, ForgotPasswordSendOtp, ForgotPassword } = require("../controllers/Authentication.js");

//step-4

router.post("/signup", Signup);
router.post("/verify-account",VerifyAccount);
router.post("/login",Login);
router.post("/send-otp",ForgotPasswordSendOtp);
router.post("/forgot-password",ForgotPassword);


//step-5
module.exports = router;