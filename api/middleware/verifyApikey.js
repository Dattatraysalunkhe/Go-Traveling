import { apiError } from "../Utils/apiError.js"
import { apiResponce } from "../Utils/apiResponce.js"


const CheckApiKey = (req,res,next) => {

    const ApiKey = req.headers['x-api-key']

    if(!ApiKey)
    {
        return res
        .status(401)
        .json(
            new apiError(
                403,
                "somthing went wrong missing api key",
                ["missing Api key "]
            )
        )
    }

    if(ApiKey === process.env.X_API_Key){
        next()
    }else{
        return res
        .status(401)
        .json(
            new apiError(
                401,
                "Forbidden: Invalid API Key",
                ["unAuthroised apikey "]
            )   
        )
    }

    



}

export {CheckApiKey}