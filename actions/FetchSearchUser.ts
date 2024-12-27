'use server'
import { connectToMongoDB } from "@/lib/dbConnect";

import userModel from "../models/UserModel";

export const fetchSearchedUsers=async (debouncedSearchVal)=>{
    
    (await connectToMongoDB()).withSession(()=>{
        console.log(debouncedSearchVal)
    return userModel.find({
        $or:[ 
            {
                name:{$regex: new RegExp(debouncedSearchVal,'i') }
            },{
                email:{$regex:new RegExp(debouncedSearchVal,'i')}
            }
        ]
    }).then(res=>{
        console.log(res)
        return res
    }).catch(error=>{
        console.error("Error fetching data:", error);
      throw error;
    })

    })
    
  
    
}