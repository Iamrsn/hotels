const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save', async function(next){
    const person=this
    //hash the password only if it has been modeified (or is new)
    if(!person.isModified('password')) return next();
    try {
        //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedpassword = await bcrypt.hash(person.password,salt);

        //override the password hashed to the plain password
        person.password=hashedpassword;
        
        next()
    } catch (error) {
        return next(error)
    }
})

personSchema.methods.comparePassword=async function(candidatepassword){
    try {
        const ismatch=await bcrypt.compare(candidatepassword,this.password);
        return ismatch;
    } catch (error) {
        throw error;
    }
}

const person=mongoose.model("person",personSchema);
module.exports=person;