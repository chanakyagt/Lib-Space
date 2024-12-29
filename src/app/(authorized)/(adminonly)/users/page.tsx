'use client'
import React, { useEffect, useState } from 'react'
import { fetchUsers } from "../../../../../actions/FetchUsers"
import UserCard from '@/components/UserCard'
import UserSearch from '@/components/UserSearh'
import UserSkeletonCard from '@/components/UserSkeletonCard'
import AddUserPlus from '@/components/AddUserPlus'

const book = () => {
  const[loadingState,setLoadingState]=useState(true)
  const [users,setUsers]=useState([])
  useEffect(() => {
    const getUsers = async()=>{
      const users =await fetchUsers()
      setUsers(users)
      setLoadingState(false)
      console.log(users)
    }

    getUsers()
    console.log(users)
  }, [])
  

  return (
    <div className='flex flex-col gap-4 w-full'>
      <UserSearch></UserSearch>
      {loadingState?
      <div className="flex flex-wrap gap-2">
        <UserSkeletonCard></UserSkeletonCard>
        <UserSkeletonCard></UserSkeletonCard>
        <UserSkeletonCard></UserSkeletonCard>
        <UserSkeletonCard></UserSkeletonCard>
        <UserSkeletonCard></UserSkeletonCard>
        <UserSkeletonCard></UserSkeletonCard>
        <UserSkeletonCard></UserSkeletonCard>
        </div>
    :
        <div className="flex flex-wrap gap-2">{

          users.map((item)=>{
            return (<UserCard key={item.email} item={item}></UserCard>)
          })
          }</div>
      }
      <AddUserPlus></AddUserPlus>
      </div>
  )
}

export default book