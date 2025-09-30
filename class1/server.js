//step1 - install and  import express
const express=require("express");
const mongoose=require("mongoose")
const UserRoute=require("./routes/UserRoute.js")
//step2 create the instance of express taaki ise instance pr server ko chalu kr paaye ya route,controller mount kr paaye
const app=express();

//step 3 start the server via using listen method
const port=3000;
app.listen(3000,()=>{
    console.log(`server start sucessfully on port no.${port}`)
})


//step4
// create the demo request so i can see the changes on ui

app.get("/",(req,res)=>{
    // console.log(req)
    res.send("<h1>This is heading one</h1>")
})

mongoose.connect("mongodb://localhost:27017/batch18").then(()=>{
    console.log("suc")
}).catch((err)=>{
    console.log("err")
})

// app.get("/user",(req,res)=>{
//     res.send(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Beautiful Web Page</title>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"/>
//   <style>
//     * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }

//     body {
//       font-family: 'Inter', sans-serif;
//       background: linear-gradient(135deg, #ece9e6, #ffffff);
//       color: #333;
//       height: 100vh;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }

//     .container {
//       text-align: center;
//       padding: 2rem;
//     }

//     h1 {
//       font-size: 3rem;
//       margin-bottom: 1rem;
//     }

//     p {
//       font-size: 1.2rem;
//       margin-bottom: 2rem;
//       color: #555;
//     }

//     .btn {
//       padding: 0.8rem 1.6rem;
//       font-size: 1rem;
//       background-color: #4F46E5;
//       color: #fff;
//       border: none;
//       border-radius: 8px;
//       cursor: pointer;
//       transition: background-color 0.3s ease;
//     }

//     .btn:hover {
//       background-color: #3730A3;
//     }

//     @media (max-width: 600px) {
//       h1 {
//         font-size: 2rem;
//       }

//       p {
//         font-size: 1rem;
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <h1>Welcome to My Beautiful Web Page</h1>
//     <p>This is a simple and elegant landing page built with HTML and CSS.</p>
//     <button class="btn">Get Started</button>
//   </div>
// </body>
// </html>
// `)
// })

app.use("./api/v1/students",UserRoute)