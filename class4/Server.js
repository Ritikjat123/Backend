const express = require('express');
//create instance or object of express

const app = express();

//define port
 const PORT = 3000;


 app.listen(PORT,()=>{
    console.log("server run on port no : "+PORT);
 })

 const mongoose=require("mongoose");

//  mongoose.connect("mongodb://localhost:27017/myDB");

async function connectDB(){
   try{
           await mongoose.connect("mongodb://localhost:27017/myDB");
           console.log("DB connected successfully")
   }catch(err){
      console.log("getting error in db connectionn",err);
   }
}
 
connectDB();

 app.get('/',(req,res)=>{
    res.send("<h1>welcome you are successfull</h1>")
 })