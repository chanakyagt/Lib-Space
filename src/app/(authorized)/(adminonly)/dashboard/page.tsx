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
  
const Dashboard = () => {
    const [borrowHistory,setBorrowHistory]=useState([])
    useEffect(() => {
      const res=BorrowHistory();
      setBorrowHistory(res)
       console.log(res)
     
    }, [])
    
  return (
    <Table>
       
  <TableCaption> <p>{JSON.stringify(borrowHistory)}</p></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
  )
}

export default Dashboard