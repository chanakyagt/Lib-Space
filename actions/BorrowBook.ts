'use server'
import{z} from 'zod'
import { auth } from "@/auth";
import { ObjectId } from "mongoose";
import userModel from "../models/UserModel";
import bookModel from "../models/BookModels";
import borrowModel from '../models/BorrowModel';
export const BorrowBook=async(book_id:ObjectId)=>{
    const session=await auth();
    const user=session?.user;
    console.log("user",user?.name,"of id",user?.id,"wants to borrow a book with id",book_id)
    // const {availableQuantity}=await bookModel.findOne({_id:book_id})
    // if(availableQuantity){
        
    // }
    try {
        const book=await bookModel.findOne({_id:book_id})
        const availableCopies=book.availableQuantity
        const borrower=await userModel.findOne({_id:user?.id})
        if(!book)return {type:"failure",message:"book not found"}
        if(!book.availableQuantity)return {type:"failure",message:"No copy available to borrow"}
        if(!borrower)return {type:"failure",message:"User Not Found"}
        if(borrower.borrowedBooks.includes(book_id))return {type:"failure",message:"Book Already Borrowed"}
        const response=await userModel.updateOne({_id:user?.id},{$push:{borrowedBooks:book_id}})
        const newBorrow = new borrowModel({
          book: book_id,
          borrower: user?.id,
          operation: 'borrowed'
      });
      await newBorrow.save();
        await bookModel.updateOne({_id:book_id},{$set:{availableQuantity:availableCopies-1},$push:{borrowedBy:user?.id}})
        if(response.modifiedCount>0){
            console.log("user", user?.name, "of id", user?.id, "successfully borrowed a book with id", book_id);
            return { type: "success", message: "Successfully borrowed the book" };
          }
          else{
            console.error("Failed to update the user document or no document matched.");
            return { type: "failure", message: "Some internal issue occurred" };
          }
    } catch (error) {
        console.error("Borrowing book failed:", error);
        return { type: "failure", message: error.message || "Some internal issue occurred" };
    }
}