import express from 'express'
import { signin, signup } from '../Controllers/auth.controller.js'
import { CheckApiKey } from '../middleware/verifyApikey.js'
import { CheckRateLimit } from '../middleware/verifyRateLimit.js'

const router = express.Router()

router.route('/signup').post(CheckApiKey,CheckRateLimit,signup)
router.route('/signin').post(CheckApiKey,CheckRateLimit,signin)

export default router