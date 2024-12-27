'use server';
import bookModel from "../models/BookModels";
import { connectToMongoDB } from "@/lib/dbConnect";
import mongoose from "mongoose";

const fetcher = (debouncedSearchTerm) => {
  return connectToMongoDB()
    .then(() => {
      return bookModel.find({
        $or: [
          { title: { $regex: new RegExp(debouncedSearchTerm, 'i') } },
          { isbn: { $regex: new RegExp(debouncedSearchTerm, 'i') } }
        ]
      });
    })
    .then((server_result) => {
      return server_result;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export default fetcher;
