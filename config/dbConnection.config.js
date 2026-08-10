import mongoose from "mongoose";


export const ConnectDB =async (Mongo_url)=>{
        try {
            await mongoose.connect(Mongo_url)
            console.log(`\n   DB Connected Successfully`)
            
        } catch (error) {
            console.log({error: error.message})
            
        }


}