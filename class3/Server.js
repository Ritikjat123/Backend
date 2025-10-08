// step-1
const express = require("express");
require("dotenv").config();
const ConnectDb = require("./configuration/ConnectDb.js")
//step-2
const app = express();


// step-3
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

//step-4

app.get("/", (req, res) => {
    res.send(`<b>Home Page</b>`)
})

//step-5
ConnectDb();



// attach the middleware if you are passing data from the request kee body
app.use(express.json());

// step-6
const AuthRoute = require("./routes/Authentication.js");
app.use("/api/v1/auth", AuthRoute);






