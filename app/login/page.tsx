"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/products")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/products")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient px-4">
      {/* Status bar mockup */}
      <div className="w-full py-2 flex justify-between items-center text-black">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-4">•••</div>
          <div className="h-3 w-4">📶</div>
          <div className="h-3 w-6">🔋</div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/" className="inline-flex items-center text-black">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black">Login</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full py-4 pl-12 pr-4 bg-[#f2f2f7] text-gray-500 rounded-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full py-4 pl-12 pr-4 bg-[#f2f2f7] text-gray-500 rounded-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-black underline">
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#f2f2f7] text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-800 mr-2"></div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-black">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* iPhone home indicator */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mb-2 opacity-20"></div>
    </div>
  )
}
