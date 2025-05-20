"use client"

import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { ArrowLeft, User, Bell, Lock, Moon, HelpCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-4">
        <button onClick={() => router.back()} className="flex items-center text-black mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-black mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Account</h2>
            <div className="space-y-2">
              <button
                className="w-full bg-white p-4 rounded-xl flex items-center justify-between"
                onClick={() => console.log("Edit profile")}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Edit Profile</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 transform rotate-180" />
              </button>

              <button
                className="w-full bg-white p-4 rounded-xl flex items-center justify-between"
                onClick={() => console.log("Change password")}
              >
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Change Password</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 transform rotate-180" />
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Preferences</h2>
            <div className="space-y-2">
              <div className="w-full bg-white p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Notifications</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="w-full bg-white p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Dark Mode</span>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Help & Support</h2>
            <button
              className="w-full bg-white p-4 rounded-xl flex items-center justify-between"
              onClick={() => console.log("Help center")}
            >
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                <span>Help Center</span>
              </div>
              <ArrowLeft className="h-4 w-4 text-gray-400 transform rotate-180" />
            </button>
          </div>
        </div>
      </main>

      <HomeIndicator />
    </div>
  )
}
