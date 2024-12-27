import React, { useEffect, useState } from 'react'
import BorrowersListItem from '../BorrowersListItem'
import { getBorrowersList } from '../../../actions/getBorrowersList'
import { ObjectId } from 'mongoose';

const BorrowersList = ({borrow_list}) => {

  const [blist,setbList]=useState([]);
  const [loadingState,setLoadingState]=useState(true)
  const onArrowClick=async(borrowers_ids:ObjectId[])=>{
   getBorrowersList(borrowers_ids).then((res)=>{
    JSON.parse(res)
    setbList(JSON.parse(res))
    setLoadingState(false)
    console.log(res)
    return res;
   })
    
    } 
  useEffect(() => {
    onArrowClick(borrow_list)
 
    
  }, [])
  return (
    !loadingState ? 
    <div className='w-full h-[200px] bg-green-300 flex flex-col gap-1 '>
      {/* <p>{JSON.stringify(blist)}</p> */}
      {blist.map((borrower)=>{
        console.log("entered borrower",borrower)
        return(<BorrowersListItem key={borrower._id} borrower_id={borrower._id} borrower_name={borrower.name} borrower_email={borrower.email}></BorrowersListItem>)
      })}
    </div> :
    <p>loading</p>
  )
}

export default BorrowersList