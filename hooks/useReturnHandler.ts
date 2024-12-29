import { useToast } from "@/hooks/use-toast";
import { ReturnBookAction } from "../actions/ReturnBookAction";

export const useReturnHandler=()=>{
    const {toast}=useToast();
    const ReturnHandler=async(user_id:ObjectId,return_book_ids:ObjectId[])=>{
        const response=await ReturnBookAction(user_id,return_book_ids);
        if(response?.type==="failure"){
            toast({variant:"destructive",title:"Failure in Updation",description:response.message})
       }
       else{
            toast({variant:"default",title:"Sucessful Updation",description:response?.message})
       }
       
    }
    return {ReturnHandler}
}