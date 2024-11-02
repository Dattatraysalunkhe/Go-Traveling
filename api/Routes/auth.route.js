import express from 'express'
import { signin, signup, updateProfile } from '../Controllers/auth.controller.js'
import { CheckApiKey } from '../middleware/verifyApikey.js'
import { CheckRateLimit } from '../middleware/verifyRateLimit.js'
import { verifiedJWTUser } from '../middleware/verifyJWT.js'

const router = express.Router()

router.route('/signup').post(CheckApiKey,CheckRateLimit,signup)
router.route('/signin').post(CheckApiKey,CheckRateLimit,signin)
router.route('/updateProfile').post(CheckApiKey,CheckRateLimit,verifiedJWTUser,updateProfile)

export default router