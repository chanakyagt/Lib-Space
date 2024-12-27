'use client'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CardArrow = ({user_id}) => {
    const router = useRouter()
    const arrowHandler = (user_id) => {
        console.log(user_id )
        router.push(`/users/${user_id}`)
      }
  return (
    <Button className='rounded-full' onClick={()=>arrowHandler(user_id)}><ArrowRight></ArrowRight> </Button>
  )
}

export default CardArrow