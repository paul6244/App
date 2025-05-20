"use client"

import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock order data
  const order = {
    id: params.id,
    restaurant: "Pizza Palace",
    restaurantAddress: "123 Food Street, Foodville",
    restaurantPhone: "+1 (555) 987-6543",
    customerAddress: "456 Home Avenue, Apt 4B",
    status: "On the way",
    estimatedDelivery: "10-15 min",
    placedAt: "Today, 2:30 PM",
    deliveryPerson: "Michael",
    items: [
      {
        name: "Margherita Pizza",
        options: 'Medium (12"), Thin Crust, Extra Cheese',
        price: 16.49,
        quantity: 1,
      },
      {
        name: "Caesar Salad",
        options: "Regular, No Croutons",
        price: 8.99,
        quantity: 1,
      },
    ],
    subtotal: 25.48,
    deliveryFee: 2.99,
    tax: 2.85,
    total: 31.32,
    paymentMethod: "Visa •••• 4242",
  }

  // Order status steps
  const orderSteps = [
    { id: 1, name: "Order Placed", completed: true },
    { id: 2, name: "Preparing", completed: true },
    { id: 3, name: "On the way", completed: true },
    { id: 4, name: "Delivered", completed: false },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Header */}
      <header className="px-6 py-4 flex items-center">
        <button className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-black" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-black">Order #{order.id}</h1>
          <p className="text-sm text-gray-500">Placed at {order.placedAt}</p>
        </div>
      </header>

      {/* Order Status */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-black mb-4">Order Status</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
          <div className="space-y-6 relative z-10">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-purple-500" : "bg-gray-200"
                  }`}
                >
                  {step.completed ? (
                    <span className="text-white text-sm">✓</span>
                  ) : (
                    <span className="text-gray-500 text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="ml-4">
                  <p className={`font-medium ${step.completed ? "text-black" : "text-gray-500"}`}>{step.name}</p>
                  {step.name === "On the way" && step.completed && (
                    <p className="text-sm text-gray-500">Estimated delivery: {order.estimatedDelivery}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="px-6 py-4 bg-white shadow-sm mt-4">
        <h2 className="text-lg font-bold text-black mb-4">Delivery Details</h2>
        <div className="space-y-4">
          <div className="flex">
            <MapPin className="h-5 w-5 text-purple-500 mt-1 mr-3" />
            <div>
              <p className="font-medium">Delivery Address</p>
              <p className="text-sm text-gray-600">{order.customerAddress}</p>
            </div>
          </div>
          <div className="flex">
            <Clock className="h-5 w-5 text-purple-500 mt-1 mr-3" />
            <div>
              <p className="font-medium">Estimated Delivery Time</p>
              <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
            </div>
          </div>
          <div className="flex">
            <MapPin className="h-5 w-5 text-purple-500 mt-1 mr-3" />
            <div>
              <p className="font-medium">Restaurant</p>
              <p className="text-sm text-gray-600">{order.restaurant}</p>
              <p className="text-sm text-gray-600">{order.restaurantAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-6 py-4 bg-white shadow-sm mt-4">
        <h2 className="text-lg font-bold text-black mb-4">Order Summary</h2>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p className="font-medium">
                  {item.quantity}x {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.options}</p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-gray-100 mt-2">
              <span>Total</span>
              <span className="text-purple-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="px-6 py-4 mt-auto">
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1 border-purple-500 text-purple-500 hover:bg-purple-50"
            onClick={() => console.log("Call restaurant")}
          >
            <Phone className="h-5 w-5 mr-2" />
            Call
          </Button>
          <Button
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => console.log("Message restaurant")}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Message
          </Button>
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}
