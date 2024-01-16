'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast';

export default function ResetPass() {

    const router = useRouter()

    const [token, setToken] = useState("")
    const [isVerified, setIsverified] = useState(false)
    const [err, setErr] = useState(false);

    const [email,  setEmail] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const [showPass, setShowPass] = useState(false)

    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const onSubmit = async () => {
        if (newPass === confirmPass) {
            try {
                setLoading(true)
                const resp = await axios.post('/api/users/resetpass', {email, password : newPass})

                console.log("password update ::::", resp.data)

                toast.success("Password Updated Successfully.")

                router.push('/login')
                
            } catch (err: any) {
                console.log("Password Update failed :::", err.response.data)
                toast.error("Password Update failed")
            } finally {
                setLoading(false)
            }
        } else {
            toast.error("Password doesn't match.")
        }
    }
  
    const verifyToken = async () => {
      try {
  
          const res = await axios.post('/api/users/verifyemail', {token, emailType : "RESET"})
          setIsverified(true)
          setEmail(res.data.email)
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
    }, [])
  
    useEffect(() => {
  
      if(token.length > 0){
        verifyToken()
      }
  
  }, [token])

  useEffect(() => {
    if(newPass.length > 0 && confirmPass.length){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [newPass, confirmPass])

  return (
    <div className='flex flex-col justify-center min-h-screen items-center py-2'>
        <h1 className='text-2xl font-bold my-2'> Reset Password </h1>
        {
            token ? 
            <h2 className="text-xl text-white bg-lime-500 p-2"> {token} </h2>
            : 
            <h2 className="text-xl text-white bg-lime-500 p-2"> {'No Token Found'} </h2>
        }

        

        {
            isVerified && 
            
            <div className='bg-red-600 p-4 rounded-lg mt-4'>
                <div className='flex flex-row my-6'>
                    <p className='mx-4 self-center text-lg font-medium w-24'>New Password</p>
                    <input type={showPass ? 'text' : 'password'} id="newPass" placeholder='New Password' 
                    className='p-2 rounded-md text-black border-gray-800 border-2'
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    />
                </div>
                <div className='flex flex-row my-6'>
                    <p className='mx-4 self-center text-lg font-medium w-24'>Confirm Password </p>
                    <input type={showPass ? 'text' : 'password'} id="confirmPass" placeholder='Confirm Password' 
                    className='p-2 rounded-md text-black border-gray-800 border-2'
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>
                <div className='flex flex-row justify-start my-2'>
                    <input type="checkbox" name="showPass" id="showPass" className='mr-2 w-4 h-4 self-center' onChange={() => setShowPass(!showPass)} /> 
                    <p> Show Password </p>
                </div>
                <div className='flex flex-row justify-center'>
                    <button type="button" 
                    className={`rounded-lg w-48 text-white p-2 font-medium ${buttonDisabled ? 'bg-gray-300' : 'bg-black'}`}
                    disabled = {buttonDisabled}
                    onClick = {onSubmit}
                    > {loading ? 'Loading...' : 'Submit'} </button>
                </div>
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
