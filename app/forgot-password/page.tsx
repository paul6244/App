"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log({ email })
    // Redirect to success page with reset type
    router.push("/success?type=reset")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-200 via-rose-300 to-purple-500">
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-4">
        <button onClick={() => router.back()} className="flex items-center text-black mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold text-black mb-6">Reset Password</h1>
        <p className="text-black mb-12">Enter your email address and we'll send you a link to reset your password.</p>

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

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-[#f2f2f7] text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full text-lg"
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </main>

      <HomeIndicator />
    </div>
  )
}
