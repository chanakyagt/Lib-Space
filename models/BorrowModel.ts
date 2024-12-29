import mongoose from "mongoose";
import { types } from "util";
import userModel from "./UserModel";
import bookModel from "./BookModels";

const borrowSchema=new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId ,
        required:true,
        ref:bookModel
    },
    borrower:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:userModel
    },
    operation:{
        type:String,
        required:true,
        enum:['borrowed','returned']
    }
},{
        timestamps:true
    }
)

const borrowModel=mongoose.models?.borrow || mongoose.model('borrow',borrowSchema)
export default borrowModel