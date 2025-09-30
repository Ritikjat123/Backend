// const mongoose=require("mongoose");
// const studentschema=new mongoose.create.Schema({
// Name:{type:String},
// Email:{type:String},
// Age:{type:Number}
// })
// const student=mongoose.model("Student",studentschema)
// // module.exports=mongoose.model("student",studentschema)

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Age: {
        type: Number,
        required: true
    }
});

// Export the model
module.exports = mongoose.model("Student", studentSchema);
