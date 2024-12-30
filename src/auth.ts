'use server'
import NextAuth, { CredentialsSignin } from "next-auth";
import { z } from "zod";
import { loginResolver } from "../zodResolvers/loginResolver";
import Credentials from "next-auth/providers/credentials";
import { connectToMongoDB } from "./lib/dbConnect";
import userModel from "../models/UserModel";
import { userResolver } from "../zodResolvers/userResolver";
import mongoose from "mongoose";
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // const user={name:"chanakya",email:"chanag@gmail.com",password:"12345678"}
        const email = credentials.email;
        const password = credentials.password;
        if (!email || !password) {
          throw new CredentialsSignin("please provide the necessary details");
        }
        await connectToMongoDB();
        console.log(mongoose.models)
        const userArray = await userModel.find({ email }).select("+password");
        const user=userArray[0]
        if(user){
            console.log(user)
            if (
                credentials?.email == user.email &&
                credentials?.password == user.password
              ) {
                console.log(user._id);
                return user;
              } else {
                return null;
              }
        }else{
            return null;
        }
      },
    }),
  ],
  pages:{
    signIn:"/login"
  },
  secret: process.env.AUTH_SECRET,
  callbacks:{
    jwt: async({token,user})=>{
      if(user){
        console.log(user)
        token.role=user.userType;
        token.id=user._id;
        console.log("id",token.id)
      }
      return token;
    },
    session:async({session,token})=>{
      if(session?.user){
        session.user.role=token.role[0];
        session.user.id=token.id;

      }
      return session;
    }
  }
});
