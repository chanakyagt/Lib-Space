'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { BorrowHistory } from '../../../../../actions/BorrowHistory'
import { useRouter } from 'next/navigation'
  
const Dashboard = () => {
  const router=useRouter()
    const [borrowHistory,setBorrowHistory]=useState([])
    useEffect(() => {
      const res=BorrowHistory().then((res)=>{
        setBorrowHistory(JSON.parse(res).reverse())
      })
      
       console.log(res)
     
    }, [])
    const calculateTimeAgo = (createdAt) => {
      const now = new Date();
      const createdDate = new Date(createdAt);
      const differenceInTime = now - createdDate;
    
      const differenceInHours = Math.floor(differenceInTime / (1000 * 60 * 60));
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
      const differenceInWeeks = Math.floor(differenceInDays / 7);
      const differenceInMonths = Math.floor(differenceInDays / 30);
    
      if (differenceInHours ==0) return `few mins ago`;
      if (differenceInHours < 24) return `${differenceInHours} hours ago`;
      if (differenceInDays <= 7) return `${differenceInDays} days ago`;
      if (differenceInDays > 7 && differenceInDays <= 20) return `${differenceInWeeks} weeks ago`;
      if (differenceInDays > 20) return `${differenceInMonths} months ago`;
    
      return 'just now';
    };
    
  return (
<div className='p-5'>
<Table>
    <TableCaption>
        {/* <p>{JSON.stringify(borrowHistory)}</p> */}
    </TableCaption>
    <TableHeader>
        <TableRow>
            
            <TableHead className="text-left font-bold">Book Title</TableHead>
            <TableHead className="text-left font-bold">Borrower Name</TableHead>
            <TableHead className="text-left font-bold">Operation</TableHead>
            <TableHead className="text-left font-bold">Time</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {borrowHistory.map((record, index) => (
            <TableRow key={record._id}>
               
                <TableCell className='hover:underline  hover:text-blue-600 cursor-pointer ' onClick={()=>{
                  router.push(`/books/${record.book.isbn}`)
                }}>{record.book.title}</TableCell>
                <TableCell className='hover:underline hover:text-blue-600 cursor-pointer ' onClick={()=>{
                router.push(`/users/${record.borrower._id}`)
                }}>{record.borrower.name}</TableCell>
                <TableCell className="text-right ">{record.operation}</TableCell>
                <TableCell className="text-right">{calculateTimeAgo(record.createdAt)}</TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
</div>
  )
}

export default Dashboard