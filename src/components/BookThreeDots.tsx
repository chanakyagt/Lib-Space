'use client'
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { DeleteBook } from '../../actions/DeleteBookAction'
import { useDeleteHandler } from '../../actions/useDeleteHandler'
import { revalidatePath } from 'next/cache'
import AddBookPlus from './AddBookPlus'
import BookForm from './BookForm'
import BookEditForm from './BookEditForm'

const BookThreeDots = ({book}) => {
    const[clickedTrash,setClickedTrash]=useState(false)
    const[clickedPencil,setClickedPencil]=useState(false)
  const {DeleteHandler}=useDeleteHandler();
  console.log("DeleteHandler",DeleteHandler)
  return (
<>
<DropdownMenu>
  <DropdownMenuTrigger> <EllipsisVertical className='w-5'></EllipsisVertical></DropdownMenuTrigger>
  <DropdownMenuContent>

  <DropdownMenuItem onClick={()=>{
        setClickedPencil(true)  
    }}><Pen></Pen>Edit</DropdownMenuItem>
  <DropdownMenuItem onClick={()=>{setClickedTrash(true)}}><Trash></Trash>Delete</DropdownMenuItem> 
  </DropdownMenuContent>
</DropdownMenu>


<Dialog open={clickedTrash} onOpenChange={setClickedTrash}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        The book {book.title} will be permanently deleted
      </DialogDescription>
    </DialogHeader>
    <div className='flex justify-end gap-4'>
        <Button className="px-4 text-black py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={()=>{setClickedTrash(false)}}>Cancel</Button>
        <Button
         className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
         onClick={()=>{
            // DeleteBook(book.id,book.title).then((res)=>{
            //   console.log(res)})
            DeleteHandler(book.id,book.title)
            setClickedTrash(false)
            window.location.reload();
         }}
        >Delete</Button>
    </div>
  </DialogContent>
</Dialog>


<Dialog open={clickedPencil} onOpenChange={setClickedPencil}>
  <DialogContent className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-[80vh] overflow-y-auto">
    <DialogHeader className=''>
      <DialogTitle className=''>Edit {book.title}</DialogTitle>
      <DialogDescription >
        Change the fields of the  book {book.title} and click on save
        <div>
        <BookEditForm book={book}></BookEditForm>
        </div>
      </DialogDescription>
    </DialogHeader>
    <div className='flex justify-end gap-4'>
        <Button className="px-4 text-black py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={()=>{setClickedPencil(false)}}>Cancel</Button>
        <Button
         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >Save</Button>
    </div>
  </DialogContent>
</Dialog>


 </>  
  )
}

export default BookThreeDots