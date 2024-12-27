import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  
  return (
    <div className=" w-full max-md:w-4/5 max-md:mx-auto w-4/5 h-8 bg-red-200 flex justify-between items-center z-10 px-3 ">
      <h1 className='font-bold'>Lib<span className='text-blue-600 italic'>Space</span></h1>
      <div className='flex justify-between gap-3'>
        <Link href="/products">
          <p className='text-xs font-medium hover:text-blue-600 hover:italic '>Products</p>
        </Link>
        <Link href="/pricing">
          <p className='text-xs font-medium '>Pricing</p>
        </Link>
        <Link href="/login">
          <p className='text-xs font-medium '>Login</p>
        </Link>
      </div>

    </div>
  )
}

export default Navbar