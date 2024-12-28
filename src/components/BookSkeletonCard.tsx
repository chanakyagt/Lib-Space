import React from 'react'
import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

const SkeletonCard = () => {
  return (
    <Card className="w-[300px] h-[300px] flex justify-center items-center">
        <div className="flex flex-col space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-[155px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
      </Card>
  )
}

export default SkeletonCard