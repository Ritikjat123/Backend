//file create
const mongoose=require("mongoose");
//create collection ,schema

const createSchema=new mongoose.Schema({
   fname:{type:String,required:true},
   Cname:{type:String,required:true,maxlength:40},
   Email:{type:String,required:true}
})

//export modals
module.exports= mongoose.model("newcompany",createSchema)