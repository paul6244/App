"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { Home, Search, ShoppingBag, User, Clock, CheckCircle } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("orders")
  const [activeOrderType, setActiveOrderType] = useState("active")

  // Mock orders
  const activeOrders = [
    {
      id: "ORD-1234",
      restaurant: "Pizza Palace",
      items: "1x Margherita Pizza, 1x Caesar Salad",
      total: "$25.48",
      status: "On the way",
      estimatedDelivery: "10-15 min",
      date: "Today, 2:30 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const pastOrders = [
    {
      id: "ORD-1233",
      restaurant: "Burger Joint",
      items: "2x Cheeseburger, 1x Fries",
      total: "$22.97",
      status: "Delivered",
      date: "Yesterday, 7:45 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-1232",
      restaurant: "Sushi Express",
      items: "1x California Roll, 1x Miso Soup",
      total: "$18.50",
      status: "Delivered",
      date: "May 15, 1:20 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-1231",
      restaurant: "Pizza Palace",
      items: "1x Pepperoni Pizza, 2x Garlic Bread",
      total: "$24.99",
      status: "Delivered",
      date: "May 10, 8:15 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Header */}
      <header className="px-6 py-4">
        <h1 className="text-2xl font-bold text-black">Your Orders</h1>
      </header>

      {/* Order Type Tabs */}
      <div className="px-6 py-2 flex space-x-4 border-b border-gray-200">
        <button
          className={`pb-2 px-1 font-medium ${
            activeOrderType === "active" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-500"
          }`}
          onClick={() => setActiveOrderType("active")}
        >
          Active
        </button>
        <button
          className={`pb-2 px-1 font-medium ${
            activeOrderType === "past" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-500"
          }`}
          onClick={() => setActiveOrderType("past")}
        >
          Past Orders
        </button>
      </div>

      {/* Orders List */}
      <div className="px-6 py-4 flex-1">
        {activeOrderType === "active" ? (
          activeOrders.length > 0 ? (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  onClick={() => router.push(`/order/${order.id}`)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img
                            src={order.image || "/placeholder.svg"}
                            alt={order.restaurant}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-bold">{order.restaurant}</h3>
                          <p className="text-xs text-gray-500">{order.items}</p>
                          <p className="text-sm font-medium text-purple-600 mt-1">{order.total}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-purple-500 mr-1" />
                        <span className="text-xs font-medium text-purple-500">{order.status}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">{order.date}</p>
                        <p className="text-sm font-medium">Estimated delivery: {order.estimatedDelivery}</p>
                      </div>
                      <button className="text-purple-500 text-sm font-medium">Track Order</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No active orders</p>
            </div>
          )
        ) : (
          <div className="space-y-4">
            {pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                onClick={() => router.push(`/order/${order.id}`)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.restaurant}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold">{order.restaurant}</h3>
                        <p className="text-xs text-gray-500">{order.items}</p>
                        <p className="text-sm font-medium text-purple-600 mt-1">{order.total}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs font-medium text-green-500">{order.status}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs text-gray-500">{order.date}</p>
                    <button className="text-purple-500 text-sm font-medium">Reorder</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "profile" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("profile")
              router.push("/profile")
            }}
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
