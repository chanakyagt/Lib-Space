'use server'

import mongoose from 'mongoose'
import {z} from 'zod'
import { connectToMongoDB } from '@/lib/dbConnect'
import bookModel from '../models/BookModels'
import { bookResolver } from '../zodResolvers/bookResolver'
export const addBookToDB = async(bookDetails: z.infer <typeof bookResolver>)=>{
    

    const connection=await connectToMongoDB();
    if(connection){
        try{
            const newBook=await bookModel.create(bookDetails)
            const result=newBook.save()
            console.log("ran the new book addition to db",result)
           return {type:"default",message:"book was sucessfully added"}
        }catch(e){
            console.log(e)
            return {type:"failure",message:"something went wrong"}
        }finally{
            console.log("entered finally block")
        } 
    }
    
}
