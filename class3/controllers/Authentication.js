const User = require("../modals/User.js");
const bcrypt = require("bcrypt");
const EmailSender = require("../utils/EmailSender.js");
const OtpGenerator = require("../utils/OtpGenerator.js");
//Register/Signup

exports.Signup = async (req, res) => {

    try {
        //step-1 get the Data
        const { name, email, password, confirm_password, role } = req.body;

        // step-2 Validate
        if (name === "" || email === "" || password === "" || confirm_password === "") {
            return res.status(422).json({
                success: false,
                message: "Data is invalid please enter the valid data ",

            })
        }

        // check password and confirm password should match 


        if ((password.length !== confirm_password.length)) {
            return res.status(422).json({
                success: false,
                message: "Password and confirm Password length not equal ",
            })
        }


        if ((password !== confirm_password)) {
            return res.status(422).json({
                success: false,
                message: "Password and confirm Password value mismatch ",
            })
        }

        // check kar lo ki email id already data base mhi hai agar hai to return kar jao
        const isUserExist = await User.findOne({ userEmail: email });

        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: `This email id ${email} already has account use other one`,
            })
        }


        // I AM NOT GOING TO INSERT normal password 
        let encryptPassword;
        try {
            encryptPassword = await bcrypt.hash(password, 10)
        }

        catch (error) {
            console.log("Getting error while encrpt the password")
        }



        // You have to enrpt email H.W

        // let encryptemail;
        // try {
        //     encryptemail = await bcrypt.hash(email, 10)
        // } catch (err) {
        //     console.log("Getting error while encrpt the email")
        // }

        // pahle encrypt karunga eske bad db ke andar password dalunga


        // Otp ko genereate karna hai
        const otp = OtpGenerator();

        // step-3
        const newUserData = await User.create({
            userName: name, userEmail: email,
            userPassword: encryptPassword, role,
            otp
        })


        // user db me insert go gya hai tum email send kar do user ko 
        await EmailSender(name, email, otp, "Registration successfully")

        //step-4
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully!!!!!!!!",
            data: newUserData

        })

    }
    catch (error) {
        console.log("Getting error in signup controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}


exports.VerifyAccount = async (req, res) => {
    console.log("verify")
    try {
        //step-1 get the Data
        const { email, otp } = req.body;

        // step-2 Validate
        if (email === "" || otp === "") {
            return res.status(422).json({
                success: false,
                message: "Data is invalid please enter the valid data ",

            })
        }
        // check kar lo ki email id already data base mhi hai agar hai to return kar jao
        const isUserExist = await User.findOne({ userEmail: email });

        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: `This email id ${email} not found in our record`,
            })


        }


        if (isUserExist.verifyStatus) {
            return res.status(400).json({
                success: false,
                message: `This accound is already verified, you can login`,
            })


        }

        if (isUserExist.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: `OTP Miss match please enter valid otp`,
            })
        }



        // update userverify status 

        // H.w jab account verify ho jaye tab otp name kee ket modal se hatana hai
        await User.findByIdAndUpdate({ _id: isUserExist._id }, { $set: { verifyStatus: true, otp: undefined } });

        return res.status(201).json({
            success: true,
            message: "User Profile veried Successfully!!!!!!!!",


        })

    }

    catch (error) {
        console.log("Getting error in signup controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }


}


exports.Login = async (req, res) => {

    try {
        //step-1 get the Data
        const { email, password } = req.body;

        // step-2 Validate
        if (email === "" || password === "") {
            return res.status(422).json({
                success: false,
                message: "Data is invalid please enter the valid data ",

            })
        }

        // check kar lo ki email id already data base mhi hai agar hai to return kar jao
        const isUserExist = await User.findOne({ userEmail: email });

        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: `This email id ${email} not registered with us`,
            })
        }



        // compare the user password and db password 
        if (await bcrypt.compare(password, isUserExist.userPassword)) {

            //step-4
            return res.status(200).json({
                success: true,
                message: "User Login Successfully!!!!!!!!",
               

            })
        }

        else {
            //step-4
            return res.status(400).json({
                success: false,
                message: "You have entered incorect password",
            })
        }


    }
    catch (error) {
        console.log("Getting error in signup controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}

exports.ForgotPasswordSendOtp = async (req, res) => {

    try {
        //step-1 get the Data
        const {  email } = req.body;

        // step-2 Validate
        if ( email === "" ) {
            return res.status(422).json({
                success: false,
                message: "Data is invalid please enter the valid data ",

            })
        }

        


        

        // check kar lo ki email id already data base mhi hai agar hai to return kar jao
        const isUserExist = await User.findOne({ userEmail: email });

        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: `This email id ${email} not registerd with us`,
            })
        }


        const otp = OtpGenerator()
        

        // step-3
        const newUserData = await User.findByIdAndUpdate(
            {_id:isUserExist._id},{$set:{otp:otp}}
        )


        // user db me insert go gya hai tum email send kar do user ko 
        await EmailSender(isUserExist.userName, email, otp, "reset password successfully")

        //step-4
        return res.status(200).json({
            success: true,
            message: "reset password otp send successfully",

        })

    }
    catch (error) {
        console.log("Getting error in signup controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}

exports.ForgotPassword = async (req, res) => {

    try {
        //step-1 get the Data
        const { email, new_password, confirm_password, otp } = req.body;

        // step-2 Validate
        if (email === "" || new_password === "" || confirm_password === "" || otp === "") {
            return res.status(422).json({
                success: false,
                message: "Data is invalid please enter the valid data ",

            })
        }

        // check password and confirm password should match 


        if ((new_password.length !== confirm_password.length)) {
            return res.status(422).json({
                success: false,
                message: "Password and confirm Password length not equal ",
            })
        }


        if ((new_password !== confirm_password)) {
            return res.status(422).json({
                success: false,
                message: "Password and confirm Password value mismatch ",
            })
        }

        // check kar lo ki email id already data base mhi hai agar hai to return kar jao
        const isUserExist = await User.findOne({ userEmail: email });

        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: `This email id ${email} not registerd with us`,
            })
        }


        // I AM NOT GOING TO INSERT normal password 
        let encryptPassword;
        try {
            encryptPassword = await bcrypt.hash(new_password, 10)
        }

        catch (error) {
            console.log("Getting error while encrpt the password")
        }


        // step-3
        const newUserData = await User.findByIdAndUpdate(
            {_id:isUserExist._id},{$set:{userPassword:encryptPassword}}
        )


        // user db me insert go gya hai tum email send kar do user ko 
        await EmailSender(isUserExist.name, email, otp, "password reset successfully")

        //step-4
        return res.status(201).json({
            success: true,
            message: "User password reset successfully!!!!!!!!",

        })

    }
    catch (error) {
        console.log("Getting error in signup controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}