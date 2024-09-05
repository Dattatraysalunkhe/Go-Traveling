import cookieParser from 'cookie-parser'
import express from 'express'
import {DB_Name} from "./Utils/constant.js"
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'

configDotenv() // this for env access all over

const app = express()
const port = process.env.PORT

const dbConnect = async() => {

    try {
        const connected = await mongoose.connect(`${process.env.MONGODBURL}/${DB_Name}`)
    
        console.log("Mongodb Connected")
    } catch (error) {
        console.log("Mongodb connection failed"),error
    }

}

dbConnect()

app.listen(port , () => {
    console.log(`port is listing ${port}`)
})

app.use(express.json())  //we requesting json fromat data
app.use(cookieParser())

app.use("/api", (req,res) =>{
   res.send("from feat1")
})

