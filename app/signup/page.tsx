"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log({ email, password, confirmPassword })
    // Redirect to home page after successful signup
    router.push("/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-200 via-rose-300 to-purple-500">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-black">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.01 21.49L23.64 7C23.19 6.66 18.71 3 12 3C5.28 3 0.81 6.66 0.36 7L12.01 21.49Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="h-3 w-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 8.5H3V15.5H1V8.5ZM5.5 5H7.5V19H5.5V5ZM10 8.5H12V15.5H10V8.5ZM14.5 5H16.5V19H14.5V5ZM19 8.5H21V15.5H19V8.5Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="h-3 w-8 relative">
            <div className="absolute inset-0 border border-black rounded-sm"></div>
            <div className="absolute inset-y-0 left-0 right-2 bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-6 pt-4">
        <button onClick={() => router.back()} className="flex items-center text-black mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold text-black mb-12">Sign up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mail className="h-6 w-6 text-gray-500" />
            </div>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f2f2f7] text-gray-500 rounded-full py-4 pl-14 pr-4 text-lg"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="h-6 w-6 text-gray-500" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f2f2f7] text-gray-500 rounded-full py-4 pl-14 pr-4 text-lg"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="h-6 w-6 text-gray-500" />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#f2f2f7] text-gray-500 rounded-full py-4 pl-14 pr-4 text-lg"
              required
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-[#f2f2f7] text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full text-lg"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </main>

      {/* iPhone Home Indicator */}
      <div className="h-8 flex items-end justify-center pb-1">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
