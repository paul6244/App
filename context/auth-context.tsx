"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing user on initial load
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail")
    if (storedEmail) {
      // Extract username from email (part before @)
      const nameFromEmail = storedEmail.split("@")[0]
      // Convert to proper case (capitalize first letter of each word)
      const formattedName = nameFromEmail
        .split(".")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      setUser({
        email: storedEmail,
        name: formattedName,
      })
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would validate credentials with a backend
      // For demo purposes, we'll just store the email
      localStorage.setItem("userEmail", email)

      // Extract username from email
      const nameFromEmail = email.split("@")[0]
      const formattedName = nameFromEmail
        .split(".")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      setUser({
        email,
        name: formattedName,
      })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      // In a real app, this would create a new user in the backend
      // For demo purposes, we'll just store the email
      localStorage.setItem("userEmail", email)

      // Extract username from email
      const nameFromEmail = email.split("@")[0]
      const formattedName = nameFromEmail
        .split(".")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      setUser({
        email,
        name: formattedName,
      })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("userEmail")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
