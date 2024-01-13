'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function userProfile({params} : any) {

  const router = useRouter()
  const onLogout = async () => {
    try {

      await axios.get('/api/users/logout')

      router.push('/login')
      
    } catch (err: any) {
      console.log(err.message)
      toast.error(err.response.data.error)
    }
  }
  return (
    <div className='flex flex-row justify-between m-2'>
        <h1 className='text-2xl font-bold'>Hello 
            <span className='bg-orange-400 p-1 mx-2 text-black rounded-sm uppercase'> {params.id} </span> 
        </h1>
        <button className='bg-blue-600 hover:bg-blue-800 text-white rounded-md px-4 py-2' 
        onClick={onLogout}
        >
          Logout
        </button>
    </div>
  )
}
