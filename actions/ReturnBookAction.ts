'use server'

import { ObjectId } from "mongoose"
import userModel from "../models/UserModel";
import borrowModel from "../models/BorrowModel";

export const ReturnBookAction=async(user_id:ObjectId,return_book_ids:ObjectId[])=>{
    
    console.log("return_book_ids",return_book_ids,"by user",user_id,)
    try {
        // Update the user document using $pullAll operator
        const result = await userModel.updateOne(
          { _id: user_id }, // Find the user by ID
          {
            $pull: {
              borrowedBooks: { $in: return_book_ids },
            },
          }
        );
        const returnBook=async(book_id,)=>{
          const newBorrow = new borrowModel({
            book: book_id,
            borrower: user_id,
            operation: 'returned'
        });
        await newBorrow.save();
        }
        return_book_ids.forEach((currentBook_id)=>{
          returnBook(currentBook_id)
        })
        
        if(!result.acknowledged || !result.modifiedCount)return {type:"failure",message:"something went wrong"}
        if(result.modifiedCount) return {type:"success",message:"return was sucessful"}
        console.log('Update result:', result);
      } catch (error) {
        console.error('Error updating user borrowedBooks:', error);
        return {type:"failure",message:"something went wrong"}
      }
}