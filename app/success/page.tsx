"use client"

import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "signup"

  const messages = {
    signup: {
      title: "Account Created!",
      description: "Your account has been successfully created. You can now start using the app.",
      buttonText: "Get Started",
    },
    reset: {
      title: "Email Sent!",
      description: "We've sent a password reset link to your email address.",
      buttonText: "Back to Login",
    },
  }

  const currentMessage = type === "reset" ? messages.reset : messages.signup

  const handleContinue = () => {
    if (type === "reset") {
      router.push("/login")
    } else {
      router.push("/home")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-200 via-rose-300 to-purple-500">
      <StatusBar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-white mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-black mb-4">{currentMessage.title}</h1>
        <p className="text-black mb-12">{currentMessage.description}</p>

        <Button
          className="bg-[#f2f2f7] text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full text-lg"
          onClick={handleContinue}
        >
          {currentMessage.buttonText}
        </Button>
      </main>

      <HomeIndicator />
    </div>
  )
}
