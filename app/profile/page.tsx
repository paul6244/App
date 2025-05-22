"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { User, ShoppingBag, CreditCard, MapPin, Heart, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <h1 className="text-xl font-bold">My Profile</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="content-card p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto sm:mx-0 sm:mr-6 mb-4 sm:mb-0">
              <User className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="font-bold text-lg sm:text-xl">{user?.name || "User"}</h2>
              <p className="text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
            <button className="mt-4 sm:mt-0 w-full sm:w-auto py-2 px-4 border border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="content-card overflow-hidden">
            <h3 className="font-semibold p-4 border-b">My Account</h3>
            <div className="divide-y">
              <Link href="/orders" className="flex items-center p-4 hover:bg-gray-50">
                <ShoppingBag className="h-5 w-5 text-purple-600 mr-3" />
                <span className="flex-1">My Orders</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/payment-methods" className="flex items-center p-4 hover:bg-gray-50">
                <CreditCard className="h-5 w-5 text-purple-600 mr-3" />
                <span className="flex-1">Payment Methods</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/addresses" className="flex items-center p-4 hover:bg-gray-50">
                <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                <span className="flex-1">Addresses</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/favorites" className="flex items-center p-4 hover:bg-gray-50">
                <Heart className="h-5 w-5 text-purple-600 mr-3" />
                <span className="flex-1">My Favorites</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          <div className="content-card overflow-hidden">
            <h3 className="font-semibold p-4 border-b">Settings</h3>
            <div className="divide-y">
              <Link href="/settings" className="flex items-center p-4 hover:bg-gray-50">
                <Settings className="h-5 w-5 text-purple-600 mr-3" />
                <span className="flex-1">App Settings</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/help" className="flex items-center p-4 hover:bg-gray-50">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-3" />
                <span className="flex-1">Help & Support</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full max-w-md mx-auto mt-8 py-3 bg-white/80 text-red-500 rounded-full font-medium hover:bg-white transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
