const { verify } = require("crypto");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    role: { type: String, enum: ["buyer", "admin"], default: "buyer" },
    otp: { type: Number },
    verifyStatus: { type: Boolean, default: false }

})

module.exports = mongoose.model("User", userSchema)
