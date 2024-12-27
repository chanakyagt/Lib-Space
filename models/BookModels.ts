
import mongoose from "mongoose";
import userModel from "./UserModel";
export const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    summary:{
      type:String,
      // required:true,
    },
    availableQuantity: {
      type: Number,
      required: true
    },
    borrowedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    tags: [
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Tag'
      // }
    {type:String}
    ]
  }, { timestamps: true });


  const bookModel = mongoose.models?.book || mongoose.model('book',bookSchema)

  export  default bookModel