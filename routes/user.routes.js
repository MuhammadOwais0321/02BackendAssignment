import express from 'express'
import { userProfile, userProfileUpdate } from '../controllers/user.controllers.js'

const router = express.Router()



router.post('/updateprofile/:id', userProfileUpdate)

router.get('/userProfile/:id',userProfile)

export default router