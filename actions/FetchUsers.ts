'use server'
import userModel from "../models/UserModel";

import { connectToMongoDB } from "@/lib/dbConnect";
export const fetchUsers= async ()=>{
    const connection=connectToMongoDB()
    if(connection){
        try {
            const users=await userModel.find()
            console.log(users)
            return users
        } catch (error) {
            console.log(error)
        }
    }
}