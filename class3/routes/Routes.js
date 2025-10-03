//import express s1
const express=require("express");

//create instance s2
const app=express();

//import controller s3
const createnewcompany =require("../controller/Controller.js");

//create routes s4
 Router.post("/create-newcompany",createnewcompany);

 module.exports=Router;