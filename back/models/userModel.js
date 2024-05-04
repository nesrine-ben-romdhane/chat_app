const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        max:20 ,
        min:3,
        unique:true ,

    },
    email:{
        type:String ,
        required:true,
        unique:true ,
        max:50
    },
    password:{
        type:String ,
        required:true,
        min:8 ,
        max:50
    },
    isAvatarImageSet:{
        type:Boolean ,
        default:false
    },
    AvatarImage:{
        type:String ,
        default:""

    }

})

module.exports = mongoose.model("User",userSchema)