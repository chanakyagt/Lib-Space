'use server'

import { ObjectId } from "mongoose"
import userModel from "../models/UserModel"
import { connectToMongoDB } from "@/lib/dbConnect"
import bookModel from "../models/BookModels"
import { useToast } from "@/hooks/use-toast"

export const DeleteBook=async(book_id:ObjectId,book_title:string)=>{
    console.log("trying to delete",book_id)
    connectToMongoDB()
    const delete_response=await bookModel.deleteOne({_id:book_id})
    console.log(delete_response)
    if(!delete_response.acknowledged || !delete_response.deletedCount)
    return { type:'failure', message:"Something went wrong" }
    if(delete_response.deletedCount)return {type:"default",message:`The book ${book_title} was deleted successfully`}
}