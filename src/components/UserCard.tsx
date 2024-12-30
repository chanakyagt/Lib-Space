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
    <Card className='w-[200px] h-[230px] rounded-md'>
  <CardHeader>
    <CardTitle className='text-lg line-clamp-1 '>{item.name}</CardTitle>
    <CardDescription className='italic text-md font-bold text-blue-600 line-clamp-1'>
      {item.email}
  <p className='mx-[1px]text-sm line-clamp-1'>({item.userType })</p>
      </CardDescription>
  </CardHeader>
  <CardContent>
    <p className='mx-[1px] my-[1px] text-sm line-clamp-1'>Borrowed Books:{item.borrowedBooks.length }</p>
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