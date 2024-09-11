import cookieParser from 'cookie-parser'
import express from 'express'
import {DB_Name} from "./Utils/constant.js"
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import path from 'path'

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

const __dirname = path.resolve();


app.listen(port , () => {
    console.log(`port is listing ${port}`)
})

app.use(express.json())  //we requesting json fromat data
app.use(cookieParser())

// app.use("/api", (req,res) =>{
//    res.send("from .ENV solved")
// })

import authRoter from './Routes/auth.route.js'

app.use('/api/auth',authRoter)




//  this code for after use api beacuse below code is client biuld make api above this code

app.use(express.static(path.join(__dirname, '/client/dist')));

// this for when go on / run below the file
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

