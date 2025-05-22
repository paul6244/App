"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Search, ShoppingCart } from "lucide-react"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { useCart } from "@/context/cart-context"
import { getAllProducts, searchProducts, type Product } from "@/services/product-service"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const { addItem, totalItems } = useCart()

  useEffect(() => {
    // Get all products
    const allProducts = getAllProducts()
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(searchProducts(searchQuery))
    }
  }, [searchQuery, products])

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2 text-purple-600" />
            <h1 className="text-xl font-bold">ShopEase</h1>
          </div>
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-3 pl-10 pr-4 bg-white/90 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Featured Products</h2>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link href={`/products/${product.id}`}>
                <div className="w-full h-40 overflow-hidden rounded-t-xl relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                    }}
                  />
                </div>
              </Link>
              <div className="p-3">
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-gray-500 text-xs">{product.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">₵{product.price.toFixed(2)}</span>
                  <button
                    className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="h-4 w-4 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
