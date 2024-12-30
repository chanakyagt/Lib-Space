"use server";
import bookModel from "../models/BookModels";
import { connectToMongoDB } from "@/lib/dbConnect";

export const fetchBooks = async () => {
  const connection = await connectToMongoDB();
  if (connection) {
    try {
      const res = await bookModel.find();
      console.log(res);
      // await new Promise((resolve) => setTimeout(resolve, 10000))
      return (JSON.stringify(res));
    } catch (error) {
      console.log("an error occurred", error);
      return error;
    }
  }
};

export const fetchBook = async (isbn) => {
  const connection = await connectToMongoDB();
  if (connection) {
    try {
      const res = await bookModel
        .find({
          isbn: isbn,
        })
      //  .populate("borrowedBy");
      console.log(res);
      // await new Promise((resolve) => setTimeout(resolve, 10000))
      return JSON.stringify(res);
    } catch (error) {
      console.log("an error occurred", error);
      return error;
    }
  }
};
