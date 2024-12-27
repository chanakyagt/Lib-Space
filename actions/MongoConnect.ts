'use server'
import { connectToMongoDB } from "@/lib/db"

export const run = () => {
    try{
        connectToMongoDB();
    }catch(e)
    {
        console.log(e)
    }
    finally{
        console.log('the try-catch is completed')
    }
}