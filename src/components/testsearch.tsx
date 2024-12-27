'use client'
import React, { useEffect, useState } from 'react'
  import { Input } from "@/components/ui/input"
  import SearchResults from './searchResults'
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useDebounce } from "@uidotdev/usehooks";
import { connectToMongoDB } from '@/lib/db'
import bookModel from '../../models/BookModels'
import fetcher from '../../actions/GettingBooks'
const Testsearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [result,setResult] = useState([])
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const changeHandler=(e)=>{
    setSearchTerm(e.target.value)
      console.log(searchTerm)
  }
  useEffect(()=>{
    console.log("debounced term",debouncedSearchTerm)
    const fetched_result=fetcher(debouncedSearchTerm).
    then((fetched_result)=>{ 
      console.log("searched result",fetched_result);
      setResult(fetched_result)
    })
    
    console.log("result",result)

  },[debouncedSearchTerm])
  return (
    
//     <div className='flex flex-col mx-3'>
//       <Input className='rounded-none w-[500px]' placeholder='enter book or ISBN' onChange={changeHandler}/>
// { value && <SearchResults></SearchResults>}
//       </div>
<Dialog>
  <DialogTrigger>
  <Input className=' w-[500px]' placeholder='enter book or ISBN' />
  </DialogTrigger>
  <DialogContent className='w-1/2 h-1/2'>
    <DialogHeader>
      <DialogTitle>
      <Input className='w-4/5' placeholder='enter book or ISBN' onChange={changeHandler}/>
      </DialogTitle>
      <DialogDescription>
      { searchTerm && <SearchResults search_result={result}></SearchResults>}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


  )
}

export default Testsearch