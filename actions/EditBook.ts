'use server'

import { useToast } from "@/hooks/use-toast"
import bookModel from "../models/BookModels"

export const EditBook=async(book)=>{
    console.log("book updation details",book)
   try {
    const response=await bookModel.updateOne({_id:book.id},{$set:{summary:book.summary,tags:book.tags,availableQuantity:book.availableQuantity}})
    console.log(response)
    if(!response.acknowledged || !response.modifiedCount ) return {type:"failure",message:"something went wrong"}
    if(response.modifiedCount) return {type:"default",message:"Book Updation Was Successful"}
   } catch (error) {
    return {type:"failure",message:"oops an error occurred while updating"}
   }
}

