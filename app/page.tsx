"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()

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

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Welcome</h1>
          <p className="text-lg text-gray-800">Get started with your new account</p>
        </div>

        <div className="w-full max-w-md space-y-6">
          <Button
            onClick={() => router.push("/signup")}
            className="w-full bg-[#f2f2f7] text-black hover:bg-gray-200 rounded-full py-6 text-lg font-bold"
          >
            Create Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            onClick={() => router.push("/login")}
            variant="ghost"
            className="w-full text-black hover:bg-white/20 rounded-full py-6 text-lg font-bold"
          >
            I already have an account
          </Button>
        </div>
      </main>

      {/* iPhone Home Indicator */}
      <div className="h-8 flex items-end justify-center pb-1">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
