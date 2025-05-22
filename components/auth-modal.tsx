"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail, Lock } from "lucide-react"
import { useAuth } from "@/context/auth-context"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, onSuccess, mode = "login" }: AuthModalProps) {
  const [activeMode, setActiveMode] = useState(mode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setError("")
      setActiveMode(mode)
    }
  }, [isOpen, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (activeMode === "signup" && password !== confirmPassword) {
        setError("Passwords do not match")
        setLoading(false)
        return
      }

      let success = false
      if (activeMode === "login") {
        success = await login(email, password)
      } else {
        success = await signup(email, password)
      }

      if (success) {
        onSuccess()
      } else {
        setError(activeMode === "login" ? "Invalid credentials" : "Failed to create account")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {activeMode === "login" ? "Login to continue" : "Create an account"}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full py-3 pl-12 pr-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
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
                className="w-full py-3 pl-12 pr-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {activeMode === "signup" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-3 pl-12 pr-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-purple-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  {activeMode === "login" ? "Logging in..." : "Signing up..."}
                </>
              ) : activeMode === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            {activeMode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => setActiveMode("signup")} className="text-purple-600 font-medium hover:underline">
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setActiveMode("login")} className="text-purple-600 font-medium hover:underline">
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
