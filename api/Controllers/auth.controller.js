import bcrypt, { hash } from 'bcrypt'
import { User } from '../Models/user.Model.js'

const signup = async(req,res,next) => {

   const {username, email, password, country} = req.body

   try {

   const isthereEmail = await User.findOne({
        email
   })

   if(isthereEmail){
    res.status(400).json("User already Exists")
   }

         const hashedpassword  = await bcrypt.hash(password,10)


        const newUser = new User({
            username,
            email,
            password:hashedpassword,
            country
        })

        
            await newUser.save()

            res.status(200).json({ message: 'User created successfully', user: newUser })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error' });
        }

}

const signin = async (req,res,next) => {

    const {email,password} = req.body

   try {
     const validUser = await User.findOne({
         email
     })
 
     if(!validUser){
         res.status(400).json("Invalid Creadital")
     }
 
     const prePassword =await bcrypt.compare(password,validUser.password)
 
     if(!prePassword){
          res.status(500).json("Invalid Creadital")
     }
 
     if(prePassword){
         res.status(200).json("Login succesfull")
     }
   } catch (error) {

    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
    
   }


}


export {signup,signin}