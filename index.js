import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv()
import registerRouter from './routes/register.routes.js'
import { ConnectDB } from './config/dbConnection.config.js'
import { auth } from './middlewares/auth.js'
import userRouter from './routes/user.routes.js'


const app = express()
const Port = process.env.PORT
const Mongo_url = process.env.MONGODB_URL

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// DBConnection
ConnectDB(Mongo_url)


//Route
app.use('/api/',registerRouter)
app.use(auth)
app.use('/api/user', userRouter)
// Server is running here
app.listen(Port, ()=>{
    console.log(`\n   Server Started Successfully \n   Server is running at Port ${Port} \n   http://localhost:${Port}`)
    
})