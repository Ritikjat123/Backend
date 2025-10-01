const getDBConnection = require("./configuration/DBConnect");

//step 1 
const express = required("express");

//step2

const app=express();

//step 3

const PORT=4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`)
})


///attach middleware 
app.use(express.JSON)


//step4
app.get("/",(request,response)=>{
  req.send("<h1>success</h1>")
})

