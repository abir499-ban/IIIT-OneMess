import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifyToken:{
        type:String,
    },
    tokenExpiry:{
        type:Date
    },


})

const User  =mongoose.models.users || mongoose.model("users", UserSchema);


export default User