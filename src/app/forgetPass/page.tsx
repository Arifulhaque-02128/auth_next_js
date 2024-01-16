'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgetPass() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  
  const onSubmit = async () => {

    try {
        setLoading(true)
        const res = await axios.post(
            '/api/users/forgetpass', {email}
          )
    
          console.log("User Found ::: ",  res.data)
          // router.push('/login')
          router.push('/temp')
        
    } catch (err : any) {
        console.log("Reset Password Failed :::", err.message)
        toast.error(err.response.data.error)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    if(email.length > 0){
        setButtonDisabled(false)
    } else {
        setButtonDisabled(true)
    }
  }, [email])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen my-2'>

        <div className='bg-red-600 p-4 rounded-lg'>
            <div className='flex flex-row my-6'>
                <p className='mx-4 self-center text-lg font-medium w-24'>Your Email </p>
                <input type='email' id="email" placeholder='Enter Your Email...' 
                className='p-2 rounded-md text-black border-gray-800 border-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex flex-row justify-center'>
                <button type="button" 
                className={`rounded-lg w-48 text-white p-2 font-medium ${buttonDisabled ? 'bg-gray-300' : 'bg-black'}`}
                disabled = {buttonDisabled}
                onClick = {onSubmit}
                > {loading ? 'Loading...' : 'Submit'} </button>
            </div>
        </div>
        
    </div>
  )
}
