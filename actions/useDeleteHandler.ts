import { ObjectId } from "mongoose"
import { DeleteBook } from "./DeleteBookAction"
import { useToast } from "@/hooks/use-toast"

export const useDeleteHandler=()=>{
    const {toast}=useToast()
    const DeleteHandler=async(book_id:ObjectId,book_title:string)=>{
        const response=await DeleteBook(book_id,book_title)
    if(response?.type==="failure"){
        toast({variant:"destructive",title:"",description:response.message})
    }else{
        toast({variant:"default",title:"",description:response?.message})
    }
    }
    return {DeleteHandler}
}