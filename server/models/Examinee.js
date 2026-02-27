const mongoose = require('mongoose')
const Session = require('./Session')

const examineeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    collage:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    session:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Session",
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive","delete"],
        default:"inactive"
    },
})
module.exports = mongoose.model("Examinee",examineeSchema)