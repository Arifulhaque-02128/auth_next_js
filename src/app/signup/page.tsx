'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignUp() {

  const router = useRouter()

  const [user, setUser]  = useState({
    email : '',
    password : "",
    username : '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [user])

  const onSignUp = async () => {
    try {

      setLoading(true);
      const res = await axios.post(
        '/api/users/signup', user
      )

      console.log("SignUp successfull. ",  res.data)
      router.push('/login')


    } catch (err : any) {
      
      console.log("Signup failed : ", err.message );
      toast.error(err.response.data.error)

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='flex flex-col justify-center min-h-screen'>
        <h1 className='text-2xl my-4 font-bold self-center'>Sign Up</h1>

        <div className='self-center bg-lime-200 p-12 text-black rounded-md'>

          <div className='flex flex-row my-6'>
            <p className='mx-4 self-center text-lg font-medium w-24'>User Name </p>
            <input type='text' id="username" placeholder='Enter Your Name...' 
            className='p-2 border-black rounded-md text-gray-800 border-2'
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            />
          </div>


          <div className='flex flex-row my-6'>
            <p className='mx-4 self-center text-lg font-medium w-24'>Email </p>
            <input type='email' id="email" placeholder='Enter Your Email...' 
            className='p-2 rounded-md text-black border-gray-800 border-2'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>


          <div className='flex flex-row my-6'>
            <p className='mx-4 self-center text-lg font-medium w-24'> Password </p>
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
            onClick = {onSignUp}
            > {loading ? 'Loading...' : 'SignUp Here...'} </button>
          </div>
          

          <div className='flex flex-row my-6'> 
            <input type="checkbox" name="haveLogin" id="haveLogin" className='mx-4 w-4 h-4 self-center' />
            <p className='self-center'> Already have an account ? <Link href={'/login'} className='underline text-blue-500'> Login Here </Link> </p>
          </div>

        </div>
    </div>
  )
}
