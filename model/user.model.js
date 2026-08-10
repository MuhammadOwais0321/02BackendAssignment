import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type : String,
        require: true,
        unique: true
    },
    password:{
        type : String,
        require: true,
    },
    name:{
        type : String,
        require: false,
    },
    phone:{
        type : String,
        require: false,
    },
    address:{
        type : String,
        require: false,
    },
    gender:{
        type: String ,
        require: false,
        enum:['Male', "Female", 'Others']
    }
})

 export const User = mongoose.model('user', userSchema)