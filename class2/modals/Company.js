const mngoose=require("mongoose")

const companySchema=new mongoose.Schema({


    cName:{type:String,required:true},
     totolEmployee:{type:Number,required:true},
      cAddress:{type:String,required:true,maxLength:40}
       
})

module.exports=mongoose.module("company",companySchema)