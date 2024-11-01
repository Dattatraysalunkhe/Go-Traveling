import rateLimit from "express-rate-limit"


const CheckRateLimit = rateLimit({
    windowMs:15 * 60 * 1000,
    max:10,
    message: "Too many requests, please try again later."
})


export {CheckRateLimit}