'use server'
import { ObjectId } from "mongoose";
import userModel from "../models/UserModel";
import { connectToMongoDB } from "@/lib/dbConnect";
import { useEffect } from "react";



export const getBorrowersList=async(borrowers_ids:ObjectId[])=>{
    console.log("entered borrowed list function")
    connectToMongoDB()
    const response=await userModel.find({_id:borrowers_ids})
    console.log(response)
    return JSON.stringify(response)
}