const newcompany=require("../modals/Models.js");

exports.createnewcompany=async(req,res)=>{
       try{
        const{fname,Cname,Emai}=req.body;
        
        //validation
        if(!fname||!Cname||!Emai){
            return res.status(204).json({
                success:false,
                message:"data is empty"
            })  
        }
      
        const data = await newcompany.create({fname,Cname,Email});
        return res.status(201).json({
            success:true,
            message:"successfully created",
            data:data
        })

       }catch(error){
             return res.status(500).json({
                success:false,
                message:"internal server error",
                error:error.message
             })
       }
}

