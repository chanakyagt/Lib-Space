import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Skeleton } from './ui/skeleton'
export const UserSkeletonCard = () => {
  return (
    <>
        <Card className='rounded-md w-[200px] h-[230px] flex flex-col gap-3 py-2 py-2 items-center'>
        <Skeleton className="mt-[18px] h-[15px] w-[150px]" />
        <Skeleton className="mb-[10px] h-[15px] w-[150px]" />
        
        <Skeleton className="h-[35px] w-[150px] mb-[25px]" />
        <div className='w-full h-2 h-[30px] display-flex justify-end items-end'>
        <Skeleton className="mx-[120px] h-full w-[60px] rounded-full" />
        </div>
        </Card>
    </>
  )
}

export default UserSkeletonCard