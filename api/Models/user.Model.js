import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema(
    {
         username:{
            type:String,
            require:true,
            unique:true
         },
         email:{
            type:String,
            require:true,
            unique:true
         },
         mobileNumber:{
            type:String,
            unique:true

         },
         password:{
            type:String,
            require:true,
            unique:true
         },
         userProfilePic:{
            type:String,
            default:"https://cdjcnsjcnjsn/05/22/37/blank-profile-picture-973460_1280.png"
         },
         userCoverPhoto:{
            type:String,  
         },
         country:{
            type:String,
         },
         timezone:{
            type:String
         },
         language:{
            type:String,
            default:'English'
         },
         countriesVisited:[{
            type:String
         }],
         refreshToken:{
            type:String
         },
         accessToken:{
            type:String
         }
    },
    {
         timestamps:true
    }
)

export const User = mongoose.model("User",UserSchema)