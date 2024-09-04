import cookieParser from 'cookie-parser'
import express from 'express'

const app = express()
const port = 3000

app.listen(port || 4000, () => {
    console.log(`port is listing ${port}`)
})

app.use(express.json())  //we requesting json fromat data
app.use(cookieParser())

app.use("/api", (req,res) =>{
   res.send("hello there")
})