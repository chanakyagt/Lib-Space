'use server'

import { ObjectId } from "mongoose"
import userModel from "../models/UserModel"
import bookModel from "../models/BookModels"
import { connectToMongoDB } from "@/lib/dbConnect"
export const GetUser=async(user_id:ObjectId)=>{
    console.log("entered get user",user_id)
    connectToMongoDB()
    const res=await userModel.findOne({_id:user_id}).populate('borrowedBooks')
    return JSON.stringify(res)
}