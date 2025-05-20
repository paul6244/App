"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { SearchIcon, Home, ShoppingBag, User, Star, X } from "lucide-react"

export default function SearchPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState(["Pizza", "Burger", "Sushi", "Salad"])

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: "Pizza Palace",
      type: "restaurant",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      deliveryTime: "15-25 min",
      tags: ["Italian", "Pizza"],
    },
    {
      id: 2,
      name: "Margherita Pizza",
      type: "dish",
      restaurant: "Pizza Palace",
      image: "/placeholder.svg?height=60&width=60",
      price: "$12.99",
    },
    {
      id: 3,
      name: "Pepperoni Pizza",
      type: "dish",
      restaurant: "Pizza Palace",
      image: "/placeholder.svg?height=60&width=60",
      price: "$14.99",
    },
    {
      id: 4,
      name: "Pizza Hut",
      type: "restaurant",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.2,
      deliveryTime: "20-30 min",
      tags: ["American", "Pizza"],
    },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)])
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== search))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Search Header */}
      <header className="px-6 py-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for restaurants or dishes"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-[#f2f2f7] rounded-full py-3 pl-12 pr-10 text-gray-700 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={clearSearch}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </header>

      {/* Search Content */}
      <div className="px-6 py-2 flex-1">
        {searchQuery ? (
          // Search Results
          <div>
            <h2 className="text-lg font-bold text-black mb-4">Results for "{searchQuery}"</h2>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-xl shadow-sm p-3 flex"
                  onClick={() =>
                    router.push(result.type === "restaurant" ? `/restaurant/${result.id}` : `/item/${result.id}`)
                  }
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={result.image || "/placeholder.svg"}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 ml-3">
                    <h3 className="font-bold">{result.name}</h3>
                    {result.type === "restaurant" ? (
                      <div>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs font-medium">{result.rating}</span>
                          <span className="text-xs text-gray-500 mx-2">•</span>
                          <span className="text-xs text-gray-500">{result.deliveryTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {result.tags.map((tag, index) => (
                            <span key={index} className="text-xs text-gray-500">
                              {tag}
                              {index < result.tags.length - 1 ? " • " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-500 mt-1">{result.restaurant}</p>
                        <p className="text-sm font-bold text-purple-600 mt-1">{result.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Recent Searches
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-black">Recent Searches</h2>
              {recentSearches.length > 0 && (
                <button className="text-purple-500 text-sm" onClick={() => setRecentSearches([])}>
                  Clear All
                </button>
              )}
            </div>
            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-xl">
                    <button className="text-left flex-1" onClick={() => handleSearch(search)}>
                      <span>{search}</span>
                    </button>
                    <button onClick={() => removeRecentSearch(search)}>
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent searches</p>
            )}
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
            onClick={() => setActiveTab("search")}
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
