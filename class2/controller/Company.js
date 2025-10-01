const Company=require("../modals/Company.js");
//step2
exports.createCompany=async(req,res=>{
    try{
        const {cName,totolEmployee,cAddress}=req.body;
        if(!cName||!totolEmployee||!cAddress){
          return res.status(204).JSON({
            success:false,
            message:"field is empty please fill",
            error:error.message
          })
        }
     const cdata=await Company.create({cName,totolEmployee,cAddress});
    return res.status(201).JSON({
        success:true,
        message:"code is running succesfully"
    })

    }catch(error){
    console.log(error,"error in company controller")

    return res.status (500,JSON({
        success:false,
        message:"inter server error",
        error:error.message
    }))
    
    }
})