
import React from 'react'
import { fetchUsers } from './server';
import { auth } from '@/auth';


const Home = async () => {
  const session=await auth();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
     
    </div>
  )
}

export default Home