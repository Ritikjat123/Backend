// const express=require("express");
// const router=express.Router()
// const createStudent=require("../controller/StudentController.js")


// router.get("/create-student",createStudent)

// module.exports=router

const express = require("express");
const router = express.Router();

// if you exported like:  exports.createStudent = (req,res)=>{...}
const { createStudent } = require("../controller/StudentController.js");

router.get("/create-student", createStudent);

module.exports = router;
