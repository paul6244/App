"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { Search, MapPin, ChevronDown, Star, Clock, Home, SearchIcon, ShoppingBag, User } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")

  // Mock user location
  const userLocation = "123 Main Street"

  // Mock food categories
  const categories = [
    { id: 1, name: "Pizza", icon: "🍕" },
    { id: 2, name: "Burgers", icon: "🍔" },
    { id: 3, name: "Sushi", icon: "🍣" },
    { id: 4, name: "Salads", icon: "🥗" },
    { id: 5, name: "Dessert", icon: "🍰" },
  ]

  // Mock restaurants
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.8,
      deliveryTime: "15-25 min",
      deliveryFee: "$2.99",
      tags: ["Italian", "Pizza", "Fast"],
    },
    {
      id: 2,
      name: "Burger Joint",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: "$1.99",
      tags: ["American", "Burgers", "Fries"],
    },
    {
      id: 3,
      name: "Sushi Express",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: "$3.99",
      tags: ["Japanese", "Sushi", "Healthy"],
    },
  ]

  // Mock popular items
  const popularItems = [
    {
      id: 1,
      name: "Double Cheeseburger",
      restaurant: "Burger Joint",
      image: "/placeholder.svg?height=100&width=100",
      price: "$12.99",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      restaurant: "Pizza Palace",
      image: "/placeholder.svg?height=100&width=100",
      price: "$14.99",
    },
    {
      id: 3,
      name: "California Roll",
      restaurant: "Sushi Express",
      image: "/placeholder.svg?height=100&width=100",
      price: "$9.99",
    },
    {
      id: 4,
      name: "Caesar Salad",
      restaurant: "Fresh Greens",
      image: "/placeholder.svg?height=100&width=100",
      price: "$8.99",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Header with Location */}
      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-purple-500" />
            <div className="ml-2">
              <p className="text-xs text-gray-500">Delivery to</p>
              <div className="flex items-center">
                <p className="font-medium text-black">{userLocation}</p>
                <ChevronDown className="h-4 w-4 ml-1 text-purple-500" />
              </div>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            onClick={() => router.push("/profile")}
          >
            <User className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-6 py-2">
        <div
          className="relative bg-[#f2f2f7] rounded-full py-3 px-4 flex items-center"
          onClick={() => router.push("/search")}
        >
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <p className="text-gray-500">Search for restaurants or dishes</p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-black mb-4">Categories</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center min-w-[70px]"
              onClick={() => console.log(`Selected category: ${category.name}`)}
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl mb-1">
                {category.icon}
              </div>
              <p className="text-xs text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="px-6 py-2">
        <h2 className="text-lg font-bold text-black mb-4">Popular Right Now</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-2 min-w-[140px]"
              onClick={() => router.push(`/item/${item.id}`)}
            >
              <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.restaurant}</p>
              <p className="text-sm font-bold text-purple-600 mt-1">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="px-6 py-4 flex-1">
        <h2 className="text-lg font-bold text-black mb-4">Featured Restaurants</h2>
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
            >
              <div className="w-full h-32 relative">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{restaurant.name}</h3>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {restaurant.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-gray-500">
                      {tag}
                      {index < restaurant.tags.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">{restaurant.deliveryTime}</span>
                  </div>
                  <span className="text-xs text-gray-500">Delivery: {restaurant.deliveryFee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
            className={`flex flex-col items-center p-2 ${activeTab === "search" ? "text-purple-500" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("search")
              router.push("/search")
            }}
          >
            <SearchIcon className="h-6 w-6" />
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
