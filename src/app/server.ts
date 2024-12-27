"use server";

import { connectToMongoDB } from "@/lib/dbConnect";
import userModel from "../../models/UserModel";

export const fetchUsers = async () => {
  await connectToMongoDB();
  const obj = await userModel.findOne({
    name: "chotu",
  });
  return JSON.stringify(obj);
};
