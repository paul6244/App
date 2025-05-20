"use client"

import { useFormState, useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { login } from "@/actions/auth-actions"
import { useEffect } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="bg-[#f2f2f7] text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full text-lg"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        "Log In"
      )}
    </Button>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [state, formAction] = useFormState(login, {})

  useEffect(() => {
    if (state.success) {
      router.push("/home")
    }
  }, [state.success, router])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-200 via-rose-300 to-purple-500">
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-4">
        <button onClick={() => router.back()} className="flex items-center text-black mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold text-black mb-12">Log in</h1>

        <form action={formAction} className="flex flex-col gap-6">
          {state.errors?.global && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
              {state.errors.global}
            </div>
          )}

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mail className="h-6 w-6 text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className={`w-full bg-[#f2f2f7] text-gray-500 rounded-full py-4 pl-14 pr-4 text-lg ${
                state.errors?.email ? "border-2 border-red-500" : ""
              }`}
              required
            />
            {state.errors?.email && <p className="text-red-500 text-sm mt-1 ml-4">{state.errors.email[0]}</p>}
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="h-6 w-6 text-gray-500" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full bg-[#f2f2f7] text-gray-500 rounded-full py-4 pl-14 pr-4 text-lg ${
                state.errors?.password ? "border-2 border-red-500" : ""
              }`}
              required
            />
            {state.errors?.password && <p className="text-red-500 text-sm mt-1 ml-4">{state.errors.password[0]}</p>}
          </div>

          <div className="flex justify-between items-center mt-2">
            <button type="button" className="text-black text-sm" onClick={() => router.push("/forgot-password")}>
              Forgot password?
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <SubmitButton />
          </div>
        </form>
      </main>

      <HomeIndicator />
    </div>
  )
}
