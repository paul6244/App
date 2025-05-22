"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, ShoppingBag, Star, Heart, Share2, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { getProductById, type Product } from "@/services/product-service"
import { AuthModal } from "@/components/auth-modal"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      const productId = Number.parseInt(params.id as string)
      const foundProduct = getProductById(productId)

      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found, redirect to products page
        router.push("/products")
      }

      setIsLoading(false)
    }
  }, [params.id, router])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    if (!isAuthenticated) {
      // Show auth modal if not authenticated
      setShowAuthModal(true)
      return
    }

    // User is authenticated, proceed with adding to cart
    addItem(product, quantity)
    router.push("/cart")
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // Add to cart after successful authentication
    if (product) {
      addItem(product, quantity)
      router.push("/cart")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen auth-gradient">
        <StatusBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen auth-gradient">
        <StatusBar />
        <div className="flex-1 flex items-center justify-center p-4 text-center">
          <div className="content-card p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
            <Link
              href="/products"
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Link href="/products" className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex space-x-4">
            <button className="p-2">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="content-card w-full h-64 md:h-96 relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=300&width=300"
              }}
            />
          </div>

          {/* Product Info */}
          <div className="content-card p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{product.name}</h1>
                <p className="text-gray-500">{product.category}</p>
              </div>
              <div className="text-2xl md:text-3xl font-bold">₵{product.price.toFixed(2)}</div>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {product.rating} ({Math.floor(product.rating * 10)} reviews)
              </span>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold mb-2">Availability</h2>
              <p className="text-gray-700">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button (visible on desktop) */}
            <div className="hidden md:block mt-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full py-3 bg-purple-600 text-white rounded-full font-bold flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-gray-400"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isAuthenticated ? "Add to Cart" : "Login to Purchase"}
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Button (fixed at bottom on mobile) */}
        <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full py-3 bg-purple-600 text-white rounded-full font-bold flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-gray-400"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {isAuthenticated ? "Add to Cart" : "Login to Purchase"}
          </button>
        </div>
      </main>

      <BottomNav />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode="login"
      />
    </div>
  )
}
