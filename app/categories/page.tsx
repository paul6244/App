"use client"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock categories data with Unsplash images
const categories = [
  {
    id: 1,
    name: "Clothing",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Footwear",
    count: 18,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Electronics",
    count: 32,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Accessories",
    count: 15,
    image:
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Jewelry",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Beauty",
    count: 20,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
]

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <h1 className="text-xl font-bold">Categories</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="space-y-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="flex items-center content-card p-3 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 overflow-hidden rounded-lg mr-4">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} products</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
