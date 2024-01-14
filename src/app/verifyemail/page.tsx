'use client'
import axios from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast';

export default function VerifyEmailPage() {

  const [token, setToken] = useState("")
  const [isVerified, setIsverified] = useState(false)
  const [err, setErr] = useState(false);

  const verifyEmail = async () => {
    try {

        await axios.post('/api/users/verifyemail', {token})
        setIsverified(true)
        toast.success("Verification successfull")
        
    } catch (err: any) {
        setErr(true)
        console.log("Verification failed :::", err.response.data)
        toast.error("Verification failed")
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1] || ''
    setToken(urlToken)
  })

  useEffect(() => {

    if(token.length > 0){
        verifyEmail()
    }

  }, [token])
  return (
    <div className='flex flex-col justify-center min-h-screen items-center py-2'>
        <h1 className='text-2xl font-bold my-2'> Verify Email </h1>
        {
            token ? 
            <h2 className="text-xl text-white bg-lime-500 p-2"> {token} </h2>
            : 
            <h2 className="text-xl text-white bg-lime-500 p-2"> {'No Token Found'} </h2>
        }

        {
            isVerified && 
            <div>
                <h1 className='text-2xl text-white'>Your Email is verified.</h1>
                <Link href={'/login'}>Login</Link>
            </div>
        }
        {
            err && 
            <div>
                <h1 className='text-2xl text-white'>Error</h1> 
            </div>
        }
    </div>
  )
}
