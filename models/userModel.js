const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please provide user name"],
        maxlength:30,
    },
    email:{
        type:String,
        required:[true, "please provide email address"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide valid email"

        ],
        unique:true,
    },
    password:{
        type:string,
        required:[true, "please provide password"],
        minlength:5,
        maxlength:20
    }
})

userSchema.pre("save", async()=>{
    const salt = await bcrypt.salt(10);
    this.password = await bcrypt.hash(salt, this.password);
})

userSchema.methods.comparePasswords = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

userSchema.methods.createJWT = async function(){
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME});
}


module.exports = mongoose.model("User", userSchema);