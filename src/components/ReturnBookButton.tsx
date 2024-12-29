import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Checkbox } from "@/components/ui/checkbox"
import { ReturnBook } from '../../actions/ReturnBookAction'
import Router from "next/router"
import { useRouter } from "next/navigation";
import { useReturnHandler } from '../../hooks/useReturnHandler'
const ReturnBookButton = ({user}) => {
    const {ReturnHandler}=useReturnHandler()
    const router = useRouter();
    const [openState,setOpenState]=useState(false)
    const[selected,setSelected]=useState([])
    const onReturnHandler=()=>{
        console.log("return clicked")
        ReturnHandler(user._id,selected)
        setOpenState(false)
        setTimeout(function() {
            window.location.reload()
        }, 2000);
        
    }

  return (<Dialog open={openState} onOpenChange={setOpenState}>
    <DialogTrigger className='flex justify-start'> 
        <Button className='w-[130px] h-[30px] hover:bg-blue-600'>Return</Button>
    </DialogTrigger>
    <DialogContent>
      
        <DialogTitle className='my-3 mb-4'>Select the books</DialogTitle>
        <div className='flex flex-col gap-3'>
            {
                user.borrowedBooks.map((item)=>{
                    return (
                        <div className='flex gap-2' key={item._id}>
                            <Checkbox key={item.id}  onCheckedChange={(checked)=>{
                                // alert(`checked state=>${checked},,,,,${item._id}`)
                                if(!checked && selected.includes(item._id)){
                                    setSelected(selected.filter(val=>val !== item._id))
                                    console.log(item.title,"was removed")
                                }
                                if(checked && !selected.includes(item._id)){
                                    setSelected([...selected,item._id])
                                    console.log(item.title,"was Added")

                                }
                                const selc=selected
                                console.log("selected",selc)
                            }} />
                            <p className='text-lg line-clamp-2 text-black '>{item.title}</p>
                        </div>
                    )
                })
            }
        <Button onClick={()=>{onReturnHandler()}} className='my-4'>Returned</Button>
        </div>
      
    </DialogContent>
  </Dialog>
  
  )
}

export default ReturnBookButton