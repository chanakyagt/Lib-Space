'use server'
import mongoose,{Connection} from 'mongoose'

let cachedConnection:Connection|null=null;


export const connectToMongoDB=async()=>{
    if(cachedConnection){
        console.log("using cached connection")
        return cachedConnection
    }
    try{
        const cnx=await mongoose.connect(process.env.MONGO_URI);
        cachedConnection=cnx.connection;
        console.log("new connection extablished")
        return cachedConnection
    }catch(error){
        console.log(error)
        throw error;
    }
}