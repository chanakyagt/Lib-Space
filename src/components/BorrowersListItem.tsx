import React from 'react'
import { ChevronRight, User } from 'lucide-react'
import Link from 'next/link'
const BorrowersListItem = ({borrower_id,borrower_name,borrower_email}) => {
  return (
    <div className="w-full h-fit py-2 flex rounded-lg bg-slate-50 justify-between items-center px-3 hover:bg-blue-500 hover:text-zinc-100 text-slate-500 cursor-pointer " >
    <div className='flex items-center gap-3'>
    <User className='text-[5px]'></User>
    <div className='flex flex-col justify-center items-start leading-none'>
        <h2 className="text-sm ">{borrower_name}</h2>
        <h1 className='text-xs '>{borrower_email}</h1>
    </div>
    </div>
    <Link href={`/users/${borrower_id}`}>
    <ChevronRight className='text-[5px]'></ChevronRight>
    </Link>
</div>
  )
}

export default BorrowersListItem