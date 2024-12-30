'use client'
'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import IndividualUser from '@/components/IndividualUser'
import { useSession } from 'next-auth/react'
import { GetUser } from '../../../../../actions/GetUser'


const page = () => {
  const[user,setUser]=useState(null)
  const[loadingState,setLoadingState]=useState(true)
  const u=useSession()
  useEffect(() => {
  
  GetUser(u.data?.user?.id).then((res)=>{
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