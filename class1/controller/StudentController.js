// const student=require("../model/UserModel.js")
// async function createStudent(req,res){


//     exports.createStudent=(req,res)=>{
       
    
// try{
//     //step1 get the data of user
// //step2 check the data if data is empty return the error
// const {
// Name,
// Email,
// Age
// }=req.body;
// if(Name===""||Email===""||!Age){
//     return res.status(500).json({
//     success:false,
//     message:"data connot be empty"
// })
// }
// //step3 create the student
// const Newuser=await student.create({
//     Name,
// Email,
// Age
// })


// //step4 return the student
// return res.status(201).json({
//     success:false,
//     message:"student inserted sucessfully"
// })


// }catch(err){
// return res.status(500).json({
//     success:false,
//     message:"internal server error"
// })
// }


// }
// }
// // export default createStudent


const student = require("../model/UserModel.js");

exports.createStudent = async (req, res) => {
    try {
        // Step 1: Get user data
        const { Name, Email, Age } = req.body;

        // Step 2: Validate the data
        if (!Name || !Email || !Age) {
            return res.status(400).json({
                success: false,
                message: "Data cannot be empty"
            });
        }

        // Step 3: Create the student
        const newUser = await student.create({ Name, Email, Age });

        // Step 4: Return success response
        return res.status(201).json({
            success: true,
            message: "Student inserted successfully",
            data: newUser
        });

    } catch (err) {
        console.error("Error creating student:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
