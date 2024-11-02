import { User } from "../Models/user.Model.js"
import { apiError } from "../Utils/apiError.js"
import jwt from 'jsonwebtoken'

const verifiedJWTUser = async (req,res,next) => {

    try {

        // const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ", "")
        const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){

            return res
            .status(401)
            .json(
                new apiError(
                    401,
                    "Error",
                    ["Unauthorized request"]
                )
            )
        }

       const checkToken = jwt.verify(token, process.env.REFRESH_TOKEN)


       const user = await User.findById(checkToken.user_id).select("-password -refreshToken")

       if(!user){

          return res
          .status(401)
          .json(
             new apiError(
                401,
                "Error",
                ["Unauthorized"]
             )
          )

       }

       if(user){

        req.user=user

        next()

       }




        
    } catch (error) {
        
    }

}

export {verifiedJWTUser}