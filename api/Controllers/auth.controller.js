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
                user_id: user._id,
                email: user.email,
                username: user.username,
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

    const { username, email, password, country, recoveryQuestion } = req.body

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

const updateProfile = async (req, res, next) => {

    if (!req.user) {
        return res
            .status(401)
            .json(
                new apiError(
                    401,
                    "Error",
                    ["UnAuthroised Access"]
                )
            )
    }

    const { username, country, language } = req.body

    if (!(username || country || language)) {
        return res
            .status(400)
            .json(
                new apiError(
                    400,
                    "Error",
                    ["filed are mandatory"]
                )
            )
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username: username,
                country: country,
                language: language,
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new apiResponce(
                200,
                user,
                "Account details update succesfully"
            ))



}


export { signup, signin, updateProfile }