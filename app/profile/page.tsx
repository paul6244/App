"use client"

import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { Home, Search, ShoppingBag, User, Settings, CreditCard, MapPin, Heart, LogOut, Loader2 } from "lucide-react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
        <p className="mt-2 text-gray-600">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Header */}
      <header className="px-6 py-4">
        <h1 className="text-2xl font-bold text-black">Profile</h1>
      </header>

      {/* User Info */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={session?.user?.image || "/placeholder.svg?height=80&width=80"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{session?.user?.name || "User"}</h2>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
        <button
          className="mt-4 w-full py-2 border border-purple-500 text-purple-500 rounded-full font-medium"
          onClick={() => router.push("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Options */}
      <div className="px-6 py-4 flex-1">
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between"
              onClick={() => router.push("/payment-methods")}
            >
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-purple-500 mr-3" />
                <span className="font-medium">Payment Methods</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <div className="border-t border-gray-100"></div>
            <button className="w-full p-4 flex items-center justify-between" onClick={() => router.push("/addresses")}>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-purple-500 mr-3" />
                <span className="font-medium">Saved Addresses</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <div className="border-t border-gray-100"></div>
            <button className="w-full p-4 flex items-center justify-between" onClick={() => router.push("/favorites")}>
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-purple-500 mr-3" />
                <span className="font-medium">Favorites</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between" onClick={() => router.push("/settings")}>
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-purple-500 mr-3" />
                <span className="font-medium">Settings</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <div className="border-t border-gray-100"></div>
            <button className="w-full p-4 flex items-center justify-between text-red-500" onClick={handleLogout}>
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-3" />
                <span className="font-medium">Log Out</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex justify-around">
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "home" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("home")
              router.push("/home")
            }}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "search" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("search")
              router.push("/search")
            }}
          >
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "orders" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("orders")
              router.push("/orders")
            }}
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "profile" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}
