import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import BookArrow from './BookArrow'
  
const SearchResults = ({search_result}) => {
  return (
    <div className='w-3/5 h-4/5 w-4/5 bg-red-200 z-10'>
        {
            search_result.map((item)=>{
                return(<Card className='h-400px my-[0px]'key={item.isbn}>
                    <CardHeader className='my-[0px]'>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className='text-xs italic font-bold'>{item.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <p className='text-sm my-[3px] text-zinc-800 text font-bold '>Available copies:{item.available}</p>
                    <p className='text-sm my-[3px] text-zinc-800'>ISBN:{item.isbn}</p>
                    </CardContent>
                    <CardFooter>
                      <BookArrow isbn={item.isbn}></BookArrow>
                    </CardFooter>
                  </Card>
                  )
            })
        }
    </div>
  )
}

export default SearchResults