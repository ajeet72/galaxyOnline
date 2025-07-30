'use client'

// import { signIn } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setError(null)
    
//     const formData = new FormData(e.currentTarget)
//     const response = await signIn('credentials', {
//       username: formData.get('username'),
//       password: formData.get('password'),
//       redirect: false,
//     })

//     if (response?.error) {
//       setError(response.error)
//     } else {
//       router.push('/admin')
//     }
//   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Username</label>
            <input
              name="username"
              type="text"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}