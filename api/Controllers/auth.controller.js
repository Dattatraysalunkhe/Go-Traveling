import bcrypt, { hash } from 'bcrypt'
import { User } from '../Models/user.Model.js'

const signup = async(req,res,next) => {

   const {username, email, password, country} = req.body

         const hashedpassword  = await bcrypt.hash(password,20)

        const newUser = new User({
            username:username,
            email,
            password:hashedpassword,
            country
        })

        try {
            await newUser.save()

            res.status(200).json({ message: 'User created successfully', user: newUser })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error' });
        }

}

const signin = async (req,res,next) => {

    const {email,password} = req.body

    const validUser = await User.findOne({
        email
    })

    if(!validUser){
        res.send().status(400).json("Invalid Creadital")
    }

    const prePassword = bcrypt.compare(password,validUser.password)

    if(!prePassword){
         res.send().status(500).json("Invalid Creadital")
    }


}


export {signup}