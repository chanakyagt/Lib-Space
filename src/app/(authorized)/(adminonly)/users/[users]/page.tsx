'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const user_id=useParams()
  return (
    <div>{JSON.stringify(user_id)}</div>
  )
}

export default page