'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function userProfile({params} : any) {

  const router = useRouter()

  const [userData, setUserData] = useState<any>(null)

  const onLogout = async () => {
    try {

      await axios.get('/api/users/logout')

      router.push('/login')
      toast.success("Logout Successfully.")
      
    } catch (err: any) {
      console.log(err.message)
      toast.error(err.response.data.error)
    }
  }

  useEffect( () => {
    axios.get('/api/users/info').then((userInfo:any) => setUserData(userInfo.data.data))
  }, [])


  return (
    <div className='flex flex-row justify-between m-2'>
        <h1 className='text-2xl font-bold self-center'>Hello 
            <span className='bg-orange-400 p-1 mx-2 text-black rounded-sm uppercase'> {params.id} </span> 
        </h1>
        <div>
          <h2 className='text-2xl font-bold my-2'> ID: <span className='bg-orange-400 p-1 mx-2 text-black rounded-sm'>{userData ? userData._id : 'NULL'} </span> </h2>
          <h2 className='text-2xl font-bold my-2'> Email: <span className='bg-orange-400 p-1 mx-2 text-black rounded-sm'>{userData ? userData.email : 'NULL'} </span> </h2>
        </div>
        
        <button className='bg-blue-600 hover:bg-blue-800 text-white rounded-md px-4 py-2 mx-4 self-center' 
        onClick={onLogout}
        >
          Logout
        </button>
    </div>
  )
}
