import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type : String,
        required: true,
        unique: true
    },
    password:{
        type : String,
        required: true,
    },
    first_name:{
        type : String,
        required: false,
    },
    last_name:{
        type : String,
        required: false,
    },
    phone:{
        type : String,
        required: false,
    },
    address:{
        type : String,
        required: false,
    },
    gender:{
        type: String ,
        required: false,
        enum:['Male', "Female", 'Others']
    },
    profile_pic:{
        type: String
    }
})

 export const User = mongoose.model('user', userSchema)