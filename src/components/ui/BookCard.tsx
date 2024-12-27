'use client'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { ArrowRight } from 'lucide-react' 
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './button'
import BookArrow from '../BookArrow'
import { BorrowBook } from '../../../actions/BorrowBook'
import { ObjectId } from 'mongoose'
import { useToast } from '@/hooks/use-toast'
import { useBorrowhandler } from '../../../hooks/useBorrowHandler'


const BookCard = ({id,title,isbn,author,available,tags}) => {
const {BorrowHandler}=useBorrowhandler();
const onBorrowClick=async(id:ObjectId)=>{
  await BorrowHandler(id)
}


  return (
    // <div className="flex-col h-full bg-green-300">
    //   <div className="w-[200px] h-[300px] bg-red-200 rounded-xl overflow-hidden">
    //       <h1 className="line-clamp-2">{title}</h1>
    //       <Separator/>
    //       <h2 className="line-clamp-2">{`ISBN:${isbn}`}</h2>
    //       <h2 className="line-clamp-2">{`Author:${author}`}</h2>
    //       <h2 className="line-clamp-2">{`Available Copies:${available}`}</h2>
    //   </div>
    // </div>

<div className='w-[300px] h-[300px] flex flex-wrap overflow-hidden'>


<Card className='w-[300px]'>
  <CardHeader>
    <CardTitle className='line-clamp-2 '>{title}</CardTitle>
    <CardDescription className='italic font-bold '>by {author}</CardDescription>
  </CardHeader>
  <CardContent className='my-1 w-full h-[120px] line-clamp-4 '>
 <div> <p className='text-sm my-[3px] text-zinc-800 text font-bold '>Available copies:{available}</p>
 <p className='text-sm my-[3px] text-zinc-800'>ISBN:{isbn}</p>
 </div >
  <div className='w-full h-[90px] overflow-y-auto pb-5 py-1'>
  <Badge className='mx-[1px] my-[1px] text-xs'>horror</Badge>
  <Badge className='mx-[1px] my-[1px] text-xs'>rom-com</Badge>
  <Badge className='mx-[1px] my-[1px] text-xs'>comedy</Badge>
  <Badge className='mx-[1px] my-[1px] text-xs'>Autobiography</Badge>
  {
    tags.map((item)=>{
      console.log(item)
    return (  <Badge className='mx-[1px] my-[1px] text-xs' key={item}>{item}</Badge>)
    })
  }
  </div>
  </CardContent>
  <CardFooter className='flex justify-between'>
    <Button onClick={()=>{onBorrowClick(id)}}>Borrow</Button>
    
    
    <BookArrow isbn={isbn}></BookArrow>
  </CardFooter>
</Card>
</div>
  )
}

export default BookCard