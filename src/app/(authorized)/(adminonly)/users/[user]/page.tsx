'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { GetUser } from '../../../../../../actions/GetUser'
import IndividualUser from '@/components/IndividualUser'


const page = () => {
  const[user,setUser]=useState(null)
  const[loadingState,setLoadingState]=useState(true)
  const params=useParams()
  useEffect(() => {
  console.log("user id=>",params.user)
  GetUser(params.user).then((res)=>{
  console.log('res=>',res)
  setUser(JSON.parse(res))
  setLoadingState(false)
 })
  

   
  }, [])
  
  return (
   <>
    {/* <div>{JSON.stringify(user)}</div> */}
    {loadingState ? "loading" : 
    <IndividualUser user={user} ></IndividualUser>
    }
   </>
  )
}

export default page