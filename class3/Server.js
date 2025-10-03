  //step1 import express
  const express=require("express");
console.log("hlw")
  //step2 create instance of express
 const app=express();
console.log("instance")
 //step3 start the server
 const PORT=4000;
 app.listen(PORT,(req,res)=>{
    console.log(`server run on ${PORT} no`)
 })

 //step 4 make the demo url
 app.get("/",(req,res)=>{
     res.send("<h1>running </h1>")
 });
