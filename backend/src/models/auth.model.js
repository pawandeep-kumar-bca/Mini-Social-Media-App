const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},{timestamps:true})

const userModel = new mongoose.model('User',userSchema)

module.exports = userModel