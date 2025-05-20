"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { ArrowLeft, Minus, Plus, MapPin, Clock, CreditCard, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const router = useRouter()

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      options: 'Medium (12"), Thin Crust, Extra Cheese',
      price: 16.49,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Caesar Salad",
      options: "Regular, No Croutons",
      price: 8.99,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
  ])

  // Mock delivery details
  const deliveryDetails = {
    address: "123 Main Street, Apt 4B",
    deliveryTime: "15-25 min",
    deliveryFee: 2.99,
    subtotal: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    tax: 2.85,
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    const subtotal = deliveryDetails.subtotal
    return (subtotal + deliveryDetails.deliveryFee + deliveryDetails.tax).toFixed(2)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Header */}
      <header className="px-6 py-4 flex items-center">
        <button className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-black" />
        </button>
        <h1 className="text-2xl font-bold text-black">Your Cart</h1>
      </header>

      {/* Delivery Details */}
      <div className="px-6 py-2 bg-white shadow-sm mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-purple-500 mt-1 mr-2" />
            <div>
              <p className="font-medium">Deliver to</p>
              <p className="text-sm text-gray-600">{deliveryDetails.address}</p>
            </div>
          </div>
          <button className="text-purple-500 text-sm font-medium">Change</button>
        </div>
        <div className="flex items-start mt-4 justify-between">
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-purple-500 mt-1 mr-2" />
            <div>
              <p className="font-medium">Delivery Time</p>
              <p className="text-sm text-gray-600">{deliveryDetails.deliveryTime}</p>
            </div>
          </div>
          <button className="text-purple-500 text-sm font-medium">Schedule</button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-6 py-2 flex-1">
        <h2 className="text-lg font-bold text-black mb-4">Order Summary</h2>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-3 flex">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 ml-3">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="font-bold text-purple-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.options}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <button
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3 text-gray-700" />
                      </button>
                      <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                      <button
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3 text-gray-700" />
                      </button>
                    </div>
                    <button className="text-red-500" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
            <Button
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full"
              onClick={() => router.push("/home")}
            >
              Browse Restaurants
            </Button>
          </div>
        )}
      </div>

      {/* Payment Method */}
      {cartItems.length > 0 && (
        <div className="px-6 py-3 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-medium">Payment Method</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Visa •••• 4242</span>
              <button className="text-purple-500 text-sm font-medium">Change</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="px-6 py-3 bg-white border-t border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${deliveryDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>${deliveryDetails.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${deliveryDetails.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-gray-100 mt-2">
              <span>Total</span>
              <span className="text-purple-600">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <Button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full py-3"
            onClick={() => router.push("/checkout")}
          >
            Place Order • ${calculateTotal()}
          </Button>
        </div>
      )}

      <HomeIndicator />
    </div>
  )
}
