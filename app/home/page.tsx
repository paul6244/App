"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { Bell, Settings, Search, Home, Calendar, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")

  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="ml-3">
            <h2 className="font-bold text-black">Welcome back,</h2>
            <p className="text-sm text-gray-600">{user.name}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="text-black">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-black" onClick={() => router.push("/settings")}>
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-6 py-2">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#f2f2f7] text-gray-500 rounded-full py-3 pl-12 pr-4"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4">
        <h1 className="text-2xl font-bold text-black mb-6">Your Dashboard</h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            className="bg-white text-black hover:bg-gray-100 shadow-sm rounded-xl h-24 flex flex-col items-center justify-center"
            onClick={() => console.log("New task")}
          >
            <Calendar className="h-8 w-8 mb-2" />
            <span>New Task</span>
          </Button>
          <Button
            className="bg-white text-black hover:bg-gray-100 shadow-sm rounded-xl h-24 flex flex-col items-center justify-center"
            onClick={() => console.log("View profile")}
          >
            <User className="h-8 w-8 mb-2" />
            <span>Profile</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-black mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-black">Activity {item}</h3>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full border-gray-300 text-black hover:bg-gray-100 rounded-full py-3 flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Log Out</span>
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex justify-around">
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "home" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "calendar" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("calendar")}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Calendar</span>
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
