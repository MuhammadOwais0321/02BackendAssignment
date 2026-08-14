import express from 'express'
import { userProfileUpdate } from '../controllers/user.controllers.js'

const router = express.Router()



router.post('/updateprofile/:id', userProfileUpdate)



export default router