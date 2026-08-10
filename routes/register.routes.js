import express from 'express'
import { userLoginController, userSignupController } from '../controllers/register.controllers.js'

const router = express.Router()

router.post('/signup', userSignupController)


router.get('/login', userLoginController)

export default router