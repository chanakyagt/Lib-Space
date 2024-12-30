'use server'
import {z} from 'zod'
import { loginResolver } from '../zodResolvers/loginResolver'
import { signIn } from '@/auth'
import { connectToMongoDB } from '@/lib/dbConnect'

export const loginAction=async(loginDetails:z.infer<typeof loginResolver> )=>{
    console.log(loginDetails)
    connectToMongoDB()
    const response=await signIn(
        "credentials",{
            email:loginDetails.email,
            password:loginDetails.password,
            redirectTo:"/books",
        }
    )
    console.log(response)
}