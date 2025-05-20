"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { ArrowLeft, Star, Clock, Info, Heart, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("Popular")

  // Mock restaurant data
  const restaurant = {
    id: params.id,
    name: params.id === "1" ? "Pizza Palace" : params.id === "2" ? "Burger Joint" : "Sushi Express",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.8,
    ratings: 200,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.99",
    minOrder: "$10.00",
    distance: "1.2 miles",
    address: "123 Food Street, Foodville",
    categories: ["Popular", "Starters", "Main Dishes", "Sides", "Drinks", "Desserts"],
  }

  // Mock menu items
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: "$12.99",
      image: "/placeholder.svg?height=80&width=80",
      popular: true,
      category: "Main Dishes",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Pizza with tomato sauce, mozzarella, and pepperoni",
      price: "$14.99",
      image: "/placeholder.svg?height=80&width=80",
      popular: true,
      category: "Main Dishes",
    },
    {
      id: 3,
      name: "Garlic Bread",
      description: "Freshly baked bread with garlic butter",
      price: "$4.99",
      image: "/placeholder.svg?height=80&width=80",
      popular: false,
      category: "Starters",
    },
    {
      id: 4,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons",
      price: "$8.99",
      image: "/placeholder.svg?height=80&width=80",
      popular: false,
      category: "Starters",
    },
    {
      id: 5,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: "$6.99",
      image: "/placeholder.svg?height=80&width=80",
      popular: true,
      category: "Desserts",
    },
  ]

  // Filter menu items based on active category
  const filteredItems = menuItems.filter((item) =>
    activeCategory === "Popular" ? item.popular : item.category === activeCategory,
  )

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Restaurant Header Image */}
      <div className="relative h-48">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 text-black" />
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
          <Heart className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-black">{restaurant.name}</h1>
        <div className="flex flex-wrap gap-1 mt-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({restaurant.ratings}+)</span>
          </div>
          <span className="text-sm text-gray-500 mx-1">•</span>
          <span className="text-sm text-gray-500">{restaurant.distance}</span>
        </div>
        <div className="flex items-center mt-2">
          <Clock className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
          <span className="text-sm text-gray-500 mx-2">•</span>
          <span className="text-sm text-gray-500">Delivery: {restaurant.deliveryFee}</span>
          <span className="text-sm text-gray-500 mx-2">•</span>
          <span className="text-sm text-gray-500">Min: {restaurant.minOrder}</span>
        </div>
        <button className="flex items-center mt-2 text-purple-500 text-sm">
          <Info className="h-4 w-4 mr-1" />
          <span>More info</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-3 sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="relative bg-[#f2f2f7] rounded-full py-2 px-4 flex items-center">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search menu items"
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-2 bg-white sticky top-16 z-10 border-b border-gray-100">
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {restaurant.categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeCategory === category ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-4 flex-1">
        <h2 className="text-lg font-bold text-black mb-4">{activeCategory}</h2>
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-3 flex"
              onClick={() => router.push(`/item/${item.id}`)}
            >
              <div className="flex-1 pr-3">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                <p className="text-purple-600 font-bold mt-2">{item.price}</p>
              </div>
              <div className="w-20 h-20 rounded-lg overflow-hidden relative">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <Plus className="h-5 w-5 text-purple-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Button */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <Button
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full py-3"
          onClick={() => router.push("/cart")}
        >
          View Cart • $0.00
        </Button>
      </div>

      <HomeIndicator />
    </div>
  )
}
