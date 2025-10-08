const mongoose = require("mongoose");

async function ConnectDb() {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("DB Connected")

    }
    catch (error) {
        console.log("Getting error while connnecting with DB")
    }
}
module.exports = ConnectDb;