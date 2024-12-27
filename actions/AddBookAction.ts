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
            newBook.save()
            console.log("ran the new book addition to db")
        }catch(e){
            console.log(e)
        }finally{
            console.log("entered finally block")
        } 
    }
    
}
