'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function Home() {

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
    <main className='flex flex-row items-center justify-center min-h-screen'>

      <div className="flex flex-col">
        <h1 className='text-2xl font-semibold'>Hello, 
          <span className='uppercase bg-lime-600 px-1 py-2 rounded-md ml-1'> Welcome! </span> 
        </h1>

        <button className='bg-blue-600 hover:bg-blue-800 text-white rounded-md px-2 py-2 mt-12' 
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

    </main>
  )
}
