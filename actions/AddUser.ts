'use server'
import {z} from 'zod'
import { userResolver } from '../zodResolvers/userResolver'
import { connectToMongoDB } from '@/lib/dbConnect'
import userModel from '../models/UserModel'

export const addUserToDB = async (userData: z.infer<typeof userResolver>) => 
{
    const connection=await connectToMongoDB()
    
    if(connection){
        try{
            const newUser=await userModel.create(userData);
            newUser.save()
        }
    catch(e){
        console.log("error caught while uploading the user",e)
    }
    finally{
        console.log("entered the finally block")
    }
    }
}