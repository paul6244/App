"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    if (items.length === 0) return
    router.push("/checkout")
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <h1 className="text-xl font-bold">Shopping Cart</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="content-card p-8 rounded-xl">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-4">Add items to your cart to checkout</p>
              <Link
                href="/products"
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="content-card flex overflow-hidden">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                      }}
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-bold">₵{(item.price * item.quantity).toFixed(2)}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="content-card p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>₵{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Shipping</span>
                <span>₵35.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Tax</span>
                <span>₵{(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₵{(totalPrice + 35 + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-purple-600 text-white rounded-full font-bold flex items-center justify-center hover:bg-purple-700 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
