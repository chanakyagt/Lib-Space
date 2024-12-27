import React from 'react'
import { Badge } from './ui/badge'
import { BookPlusIcon } from 'lucide-react'
import AddBook from './AddBook'
const IndividualBook = ({book}) => {
  
  console.log(
    "in component",book)
    // console.log("book.book)",book.book.title)
  return (
      <div className='px-10 py-4 flex flex-col gap-4'>
        {/* <h1>{JSON.stringify(book)}</h1> */}
      <h1 className='text-lg font-bold '>{book.title}</h1>
      <div>
      <h2 className='text-sm italic text-zinc-800'>by {book.author}</h2>
      <h2 className='text-sm italic text-zinc-800'>isbn: {book.isbn}</h2>
      <div className='flex gap-1'>
      <h2 className='text-sm italic text-zinc-800'>available copies: {book.availableQuantity}</h2>
      <AddBook book_id={book._id} book={book} ></AddBook>
      </div>
      </div>
      <div className='flex gap-1'>
    {book.tags.map(item=>{
      return (
        <Badge key={item}>{item}</Badge>
      )
    })}

      </div>
    <h1 className='text-md font-bold '>Summary</h1>
    <p>{book.summary}</p>
    </div>
  )
}

export default IndividualBook