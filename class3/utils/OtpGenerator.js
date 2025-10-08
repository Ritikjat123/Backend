

// insatall and  import crypto
const { error } = require("console");
const crypto = require("crypto");


function OtpGenerator() {
    try {
        const otp = crypto.randomInt(100000, 999999);
        return otp

    }
    catch (erorr) {
        console.log("gettting error while generating otp", error)
    }
}

module.exports=OtpGenerator;