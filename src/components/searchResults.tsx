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
    <div className='w-[470px]  max-h-[230px] w-4/5 bg-zinc-400 z-10 overflow-hidden overflow-y-auto flex flex-col gap-3 '>
        {
          search_result.map((item)=>{
            return(
              <div key={item.isbn} className='px-[3px] py-[2px] items-center w-full h-[80px] bg-zinc-100 flex justify-around rounded-lg '>
                 {/* { JSON.stringify(item)} */}
                  <div className='flex-col gap-2 w-[350px]'>
                  <h1 className='text-black font-bold'>{item.title}</h1>
                      <div className='flex justify-between italic font-bold text-blue-600'>
                      <h2 >{item.author}</h2>
                        <p className='text-sm my-[3px] text  '>Available:{item.availableQuantity}</p>
                    <p className='text-sm my-[3px] '>{item.isbn}</p>
                      </div>

                  </div>
             <BookArrow isbn={item.isbn}></BookArrow>
                </div>
                // <Card className='h-[70px] my-[0px] px-0 py-0'key={item.isbn}>
                //     <CardHeader className='my-[0px]'>
                //       <CardTitle className=''>{item.title}</CardTitle>
                //       <CardDescription className='my-[0px] text-xs italic font-bold leading-tight'>
                //         <h2>{item.title}</h2>
                //         <h2>{item.author}</h2>
                //         <p className='text-sm my-[3px] text-zinc-800 text font-bold '>Available copies:{item.available}</p>
                //     <p className='text-sm my-[3px] text-zinc-800'>ISBN:{item.isbn}</p>
                //         </CardDescription>
                //     </CardHeader>
                //     <CardContent>
                //     <p className='text-sm my-[3px] text-zinc-800 text font-bold '>Available copies:{item.available}</p>
                //     <p className='text-sm my-[3px] text-zinc-800'>ISBN:{item.isbn}</p>
                //     </CardContent>
                //     <CardFooter>
                //       <BookArrow isbn={item.isbn}></BookArrow>
                //     </CardFooter>
                //   </Card>
                  )
            })
        }
    </div>
  )
}

export default SearchResults