'use client'
import { ObjectId } from "mongoose"
import { addBookToDB } from "../actions/AddBookAction"
import { useToast } from "@/hooks/use-toast"
import {z} from 'zod'
import { bookResolver } from "../zodResolvers/bookResolver"
export const useAddBookHandler=()=>{
    const { toast } = useToast()
    const AddBookHandler=async(bookDetails: z.infer <typeof bookResolver>)=>{
      
      const response=await addBookToDB(bookDetails)
      if(response?.type==="failure"){
        toast({variant:"destructive",title:"",description:response.message})
      }else{
        toast({variant:"default",title:"",description:response?.message})
        
      }
    }  
    return {AddBookHandler}
}