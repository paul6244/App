"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, Package, ChevronRight } from "lucide-react"
import Link from "next/link"

interface OrderDetails {
  reference: string
  items: any[]
  totalAmount: number
  shippingAddress: {
    name: string
    address: string
    city: string
    zip: string
    country: string
    phone: string
  }
  paymentMethod: string
  date: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDetails[]>([])

  useEffect(() => {
    // Get order details from localStorage
    const storedOrderDetails = localStorage.getItem("orderDetails")
    if (storedOrderDetails) {
      try {
        const orderDetails = JSON.parse(storedOrderDetails)
        setOrders([orderDetails]) // In a real app, this would be an array of orders
      } catch (e) {
        console.error("Failed to parse order details:", e)
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen auth-gradient pb-16">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex items-center">
          <Link href="/profile" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">My Orders</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <div className="content-card p-8 rounded-xl">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
              <Link
                href="/products"
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.reference}
                href={`/orders/${order.reference}`}
                className="block content-card overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Order #{order.reference.slice(-6)}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                  </p>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold">₵{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
