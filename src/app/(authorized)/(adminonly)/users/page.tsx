'use client'
import React, { useEffect, useState } from 'react'
import { fetchUsers } from "../../../../../actions/FetchUsers"
import UserCard from '@/components/UserCard'
import UserSearch from '@/components/UserSearh'

const book = () => {
  const [users,setUsers]=useState([])
  useEffect(() => {
    const getUsers = async()=>{
      const users =await fetchUsers()
      setUsers(users)
      console.log(users)
    }

    getUsers()
    console.log(users)
  }, [])
  

  return (
    <div className='flex flex-col gap-4 w-full bg-orange-600'>
      <UserSearch></UserSearch>
      <div className="flex flex-wrap gap-2">{

users.map((item)=>{
  return (<UserCard key={item.email} item={item}></UserCard>)
})
}</div>
      </div>
  )
}

export default book