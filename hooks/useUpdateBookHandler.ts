'use client'
import { useToast } from "@/hooks/use-toast"
import { EditBook } from "../actions/EditBook"

export const updateBookHandler=()=>
    {
        const {toast}=useToast()
        const updateHandler=async(book)=>{

             const response = await EditBook(book)
             if(response?.type==="failure"){
                  toast({variant:"destructive",title:"Failure in Updation",description:response.message})
             }
             else{
                  toast({variant:"default",title:"Sucessful Updation",description:response?.message})
             }
        }
        return {updateHandler}
    }