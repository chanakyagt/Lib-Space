'use client'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from './ui/input'
import { useDebounce } from '@uidotdev/usehooks'
import { connectToMongoDB } from '@/lib/db'
import userModel from '../../models/UserModel'
import { fetchSearchedUsers } from '../../actions/FetchSearchUser'
  
const UserSearch = () => {

const [searchVal,setSearchVal]=useState('')
const [result,setResult]=useState([])
const[isLoading,setIsLoading]=useState(false)
const debouncedSearchVal=useDebounce(searchVal,300)

useEffect(() => {
  
  {
    if(debouncedSearchVal!=='')
   { const res=fetchSearchedUsers(debouncedSearchVal)
    console.log("debounced",debouncedSearchVal)
    console.log(res)}
  }

}, [debouncedSearchVal])

    const changeSearchUser=(e)=>{
        console.log(e.target.value)
        setSearchVal(e.target.value)
    }
  return (
<Dialog>
  <DialogTrigger><Input placeholder='enter user email'></Input> </DialogTrigger>
  <DialogContent className='w-[800px] h-[500px]'>
    <DialogHeader>
      <DialogTitle><Input className='w-4/5' placeholder='enter user email' onChange={changeSearchUser}></Input></DialogTitle>
      <DialogDescription className='overflow-hidden'>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


  )
}

export default UserSearch