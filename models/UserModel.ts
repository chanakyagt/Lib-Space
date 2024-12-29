
import mongoose from "mongoose";
import z from 'zod'
import { userResolver } from "../zodResolvers/userResolver";
import bookModel from "./BookModels";
export const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    borrowedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: bookModel
      }
    ],
    userType:[
      {
        type:String,
        enum:['Admin','Student'],
        required:true
        

      }
    ]
  }, { timestamps: true });


 const userModel=mongoose.models?.user||mongoose.model<z.infer<typeof userResolver>>(
    'user',userSchema
)

export default userModel