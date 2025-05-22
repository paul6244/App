"use client"

import { useState } from "react"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

// Mock favorites data with Unsplash images
const initialFavorites = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Noise Cancelling Headphones",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Fitness Smart Watch",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)
  const { addItem } = useCart()

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <h1 className="text-xl font-bold">Favorites</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="content-card p-8 rounded-xl">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-gray-500 mb-4">Items you like will appear here</p>
              <Link
                href="/products"
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div key={item.id} className="content-card flex overflow-hidden">
                <Link href={`/products/${item.id}`} className="w-24 h-24 flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 p-3 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <button onClick={() => removeFavorite(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold">₵{item.price.toFixed(2)}</span>
                    <button
                      className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
                      onClick={() => addItem(item)}
                    >
                      <ShoppingBag className="h-4 w-4 text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
