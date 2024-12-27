import { ObjectId } from "mongoose"
import { BorrowBook } from "../actions/BorrowBook"
import { useToast } from "@/hooks/use-toast"

export const useBorrowhandler=()=>{
    const { toast } = useToast()
    const BorrowHandler=async(book_id:ObjectId)=>{
      
      const response=await BorrowBook(book_id)
      if(response.type==="failure"){
        toast({variant:"destructive",title:"",description:response.message})
      }else{
        toast({variant:"default",title:"",description:response.message})
        
      }
    }  
    return {BorrowHandler}
}