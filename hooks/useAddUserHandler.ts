'use client'
import { ObjectId } from "mongoose"
import { addBookToDB } from "../actions/AddBookAction"
import { useToast } from "@/hooks/use-toast"
import {z} from 'zod'
import { bookResolver } from "../zodResolvers/bookResolver"
import { userResolver } from "../zodResolvers/userResolver"
import { addUserToDB } from "../actions/AddUser"
export const useAddUserHandler=()=>{
    const { toast } = useToast()
    const AddUserHandler=async(userDetails: z.infer <typeof userResolver>)=>{
      
      const response=await addUserToDB(userDetails)
      if(response?.type==="failure"){
        toast({variant:"destructive",title:"",description:response.message})
      }else{
        toast({variant:"default",title:"",description:response?.message})
        
      }
    }  
    return {AddUserHandler}
}