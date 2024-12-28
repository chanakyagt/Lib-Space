import { ArrowUpRight, BookPlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import BorrowersList from './ui/BorrowersList';
import { Button } from './ui/button';
import { ObjectId } from 'mongoose';
import { BorrowBook } from '../../actions/BorrowBook';
import { useBorrowhandler } from '../../hooks/useBorrowHandler';
import { FetchBorrowers } from '../../actions/FetchBorrowers';
import { getBorrowersList } from '../../actions/getBorrowersList';

const AddBook = ({book_id,book}:{book_id:ObjectId,book}) => {
  const[openState,setOpenState]=useState(false)
  const { data, status } = useSession()
  const userRole=data.user.role;
  // console.log()
  // const session=auth();
  // console.log(session)
  const {BorrowHandler}=useBorrowhandler()
const onBorrowClick=async(id:ObjectId)=>{
  await BorrowBook(id)
  }


if(userRole==="Admin"){
  return( <Dialog>
    <DialogTrigger>
    <div className=' bg-black cursor-pointer rounded-full justify-center items-center px-1 py-1' onClick={()=>{
      FetchBorrowers(book_id)
    }}>    
      <ArrowUpRight className='w-3 h-3 text-white'></ArrowUpRight>
  
      </div>
    </DialogTrigger>
    <DialogContent >
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
        check borrowers
        </DialogDescription>
        <div className='overflow-y-auto w-full'>
        <BorrowersList borrow_list={book.borrowedBy}></BorrowersList>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>)
}
else{
  return(
    <Dialog open={openState} onOpenChange={setOpenState}>
  <DialogTrigger>
  <div className=' bg-black cursor-pointer rounded-full justify-center items-center px-1 py-1'>    
    <BookPlusIcon className='w-3 h-3 text-white'></BookPlusIcon>

    </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        Are you sure you want to borrow the book
      </DialogDescription>
      <div className='flex justify-end gap-5'>
      <Button onClick={()=>{
        onBorrowClick(book_id)
        setOpenState(false)
      }}>Borrow</Button>
      <Button onClick={()=>{setOpenState(false)}}>Cancel</Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}
 
}

export default AddBook