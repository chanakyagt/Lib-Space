import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import CardArrow from './CardArrow'
const UserCard = ({item}) => {
  return (
    <Card>
  <CardHeader>
    <CardTitle>{item.name}</CardTitle>
    <CardDescription className='italic'>{item.email}</CardDescription>
  </CardHeader>
  <CardContent>
  <p className='mx-[1px] my-[1px] text-sm text-black-900'>user Type:{item.userType }</p>
    <p className='mx-[1px] my-[1px] text-sm'>Borrowed Books:{item.borrowedBooks.length }</p>
  </CardContent>
  <CardFooter>
  <div className='w-full  flex justify-end'>
  <CardArrow user_id={item._id}></CardArrow>
  </div>
  </CardFooter>
</Card>

  )
}

export default UserCard