const mongoose = require("mongoose")

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true //islie die hai ki isko dena jaruri hai
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'], //yahi teen hi ho sakta work me isse alag hoga to ni lega
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true  //unique hoga email sabka same ni ho skta
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
})

const person=mongoose.model("person",personSchema);
module.exports=person;