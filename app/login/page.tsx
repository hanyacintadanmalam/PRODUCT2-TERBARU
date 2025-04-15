'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [staySignedIn, setStaySignedIn] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const success = await login(username, password)
      if (success) {
        router.push('/playlist')
      } else {
        setError('Login gagal. Coba lagi.')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-md bg-[#121212] rounded-3xl shadow-lg overflow-hidden py-8 px-4 sm:px-6">
        {/* Logo Spotify */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-spotify-green mr-2" viewBox="0 0 2931 2931" fill="currentColor">
              <path d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4 558.2-127.5 1037.7-72.6 1428 163.3 43 26.5 56.7 82.6 30.4 125.6l-4.7.1zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-394.2-242.3-994.9-312.8-1460.3-171.3-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.2 194.7 53.8 33.1 70.8 103.4 37.7 157.6zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"/>
            </svg>
            <h1 className="text-xl font-bold text-white">Spotify</h1>
          </div>
        </div>
        
        {/* Log in to continue text */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold">Log in to continue.</h1>
        </div>

        {/* Login Form */}
        <div className="mb-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 bg-red-900/30 text-red-200 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {/* Username */}
            <div className="mb-4">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-full placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                placeholder="Username"
              />
            </div>
            
            {/* Password */}
            <div className="mb-4">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-full placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                placeholder="Password"
              />
            </div>
            
            {/* Stay Signed In */}
            <div className="mb-6 flex items-center">
              <input
                id="staySignedIn"
                name="staySignedIn"
                type="checkbox"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded accent-[#1DB954]"
              />
              <label htmlFor="staySignedIn" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>
            
            {/* Sign In Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-[#1DB954] text-white font-bold rounded-full hover:bg-[#18a44a] transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Memproses...' : 'LOG IN'}
              </button>
            </div>
            
            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 