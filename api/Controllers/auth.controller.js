import bcrypt, { hash } from 'bcrypt'
import { User } from '../Models/user.Model.js'
import { apiError } from '../Utils/apiError.js'
import jwt from 'jsonwebtoken'
import { apiResponce } from '../Utils/apiResponce.js'

const genrateAccessTokenandRefreshtoken = async (valid_id) => {
    try {

        const user = await User.findById(
            valid_id
        )

        const refreshToken = await jwt.sign(
            {
                // user_id:this.valid_id,
                // email:this.email,
                // username:this.username

            },
            process.env.REFRESH_TOKEN,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )


        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { refreshToken }

    } catch (error) {

    }



}

const signup = async (req, res, next) => {

    const { username, email, password, country } = req.body

    try {

        const isthereEmail = await User.findOne({
            email
        })

        if (isthereEmail) {
            return res
                .status(400)
                .json(
                    new apiError(
                        400,
                        "Error",
                        ["User already Exists"]
                    )
                )
        }

        const hashedpassword = await bcrypt.hash(password, 10)


        const newUser = new User({
            username,
            email,
            password: hashedpassword,
            country
        })


        await newUser.save()

        return res
            .status(200)
            .json(
                new apiResponce(
                    200,
                    newUser,
                    "User created successfully"
                )
            )

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }

}

const signin = async (req, res, next) => {

    const { email, password } = req.body

    try {
        const validUser = await User.findOne({
            email
        })

        if (!validUser) {
            return res
                .status(404)
                .json(
                    new apiError(
                        404,
                        "wrong",
                        ["Email Not Found..."]
                    )
                )
        }

        const prePassword = await bcrypt.compare(password, validUser.password)

        if (!prePassword) {


            return res
                .status(401)
                .json(
                    new apiError(
                        401,
                        "wrong",
                        ["wrong credentials..."]
                    )
                )
        }

        if (prePassword) {
            //  res.status(200).json("Login succesfull")

            const { refreshToken } = await genrateAccessTokenandRefreshtoken(validUser._id)

            const loggedInUser = await User.findById(validUser._id).select("-password -refreshToken -accessToken")

            const options = {
                httpsOnly: true,
                secure: true,
            }

            return res
                .status(200)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new apiResponce(
                        200,
                        loggedInUser,
                        "Login successfull"
                    )
                )
        }
    } catch (error) {

        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Server error" });

    }


}


export { signup, signin }