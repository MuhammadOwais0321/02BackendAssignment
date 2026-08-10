import express from 'express'
import { userProfileUpdate } from '../controllers/user.controllers.js'

const router = express.Router()



router.get('/updateprofile/:id', userProfileUpdate)



export default router