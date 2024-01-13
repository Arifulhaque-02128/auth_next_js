'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  
  const router = useRouter()
  const [user, setUser]  = useState({
    email : '',
    password : ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {

    try {

      setLoading(true)
      
      const res = await axios.post('/api/users/login', user)
      console.log("Login Successfull.", res.data)

      toast.success("Login Successfull.")

      router.push('/profile/'+res.data.data.username)
      
    } catch (err : any) {
      console.log("Login Failed.", err.message);
      toast.error(err.response.data.error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    const {email, password} = user
    if(email.length > 0 && password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col justify-center min-h-screen'>
        <h1 className='text-2xl my-4 font-bold self-center'>Login</h1>

        <div className='self-center bg-lime-200 p-12 text-black rounded-md'>

          <div className='flex flex-row my-6'>
            <p className='mx-4 self-center text-lg font-medium w-24 focus:outline-none'>Email </p>
            <input type='email' id="email" placeholder='Enter Your Email...' 
            className='p-2 rounded-md text-black border-gray-800 border-2'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>


          <div className='flex flex-row my-6'>
            <p className='mx-4 self-center text-lg font-medium w-24 focus:outline-none'> Password </p>
            <input type='password' id="password"
            className='p-2 rounded-md text-black border-gray-800 border-2'
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>

          <div className='flex flex-row justify-center'>
            <button type="button" 
            className={`rounded-lg w-48 text-white p-2 font-medium ${buttonDisabled ? 'bg-gray-300' : 'bg-black'}`}
            disabled = {buttonDisabled}
            onClick = {onLogin}
            > {loading ? 'Loading...' : 'Login Here...'} </button>
          </div>
          

          <div className='flex flex-row my-6'> 
            <input type="checkbox" name="haveAccount" id="haveAccount" className='mx-4 w-4 h-4 self-center' />
            <p className='self-center'> Don't have an account ? <Link href={'/signup'} className='underline text-blue-500'> SignUp Here </Link> </p>
          </div>

        </div>
    </div>
  )
}
