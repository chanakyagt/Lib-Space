'use server'
import { ObjectId } from "mongoose";
import bookModel from "../models/BookModels";
import { connectToMongoDB } from "@/lib/dbConnect";

export const FetchBorrowers=async(book_id:ObjectId)=>{
    connectToMongoDB()
    console.log("entered Fetch Borrowers")
    const borrowers_list=await bookModel.findOne({_id:book_id},{borrowedBy:1})
    console.log(borrowers_list)
}

