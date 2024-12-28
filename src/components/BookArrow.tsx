'use client'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BookArrow = ({isbn}) => {
    const router = useRouter()
    const arrowHandler = (isbn) => {
        console.log(isbn )
        router.push(`/books/${isbn}`)
      }
  return (
    <Button onClick={()=>arrowHandler(isbn)} className=' hover:bg-blue-600'><ArrowRight></ArrowRight> </Button>
  )
}

export default BookArrow