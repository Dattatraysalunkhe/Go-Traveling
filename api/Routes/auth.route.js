import express from 'express'
import { signup } from '../Controllers/auth.controller.js'

const router = express.Router()

router.route('/signup').get(signup)

export default router