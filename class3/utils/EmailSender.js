const nodemailer = require("nodemailer");
const RegistrationTemplate=require("../templates/RegistrationTemplate.js")
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});




async function EmailSender(userName, email,otp, subject) {
    try {
        await transporter.sendMail({
            from: 'jagmohanrai082@gmail.com',
            to: email,
            subject: subject,
            // html: RegistrationTemplate(userName,otp)
            text:`below otp: ${otp} used for reset the password`

        });
    }
    catch (error) {
        console.log("getting an error while sending the email", error)
    }

}


module.exports = EmailSender;

