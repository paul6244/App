"use client"

import { StatusBar } from "@/components/status-bar"
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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

export default function PaymentSuccessPage() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Get order details from localStorage
    const storedOrderDetails = localStorage.getItem("orderDetails")
    if (storedOrderDetails) {
      try {
        setOrderDetails(JSON.parse(storedOrderDetails))
      } catch (e) {
        console.error("Failed to parse order details:", e)
      }
    } else {
      // No order details found, redirect to products page
      router.push("/products")
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  if (!orderDetails) {
    return (
      <div className="flex flex-col min-h-screen auth-gradient">
        <StatusBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient">
      <StatusBar />

      <main className="flex-1 p-4">
        <div className="content-card p-6 mb-4">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2 text-center">Payment Successful!</h1>
          <p className="text-gray-500 mb-6 text-center">Your order has been placed successfully.</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-bold">{orderDetails.reference}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date(orderDetails.date).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-bold">₵{orderDetails.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Delivery Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium">{orderDetails.shippingAddress.name}</p>
              <p className="text-gray-600">{orderDetails.shippingAddress.address}</p>
              <p className="text-gray-600">
                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.zip}
              </p>
              <p className="text-gray-600">{orderDetails.shippingAddress.country}</p>
              <p className="text-gray-600">{orderDetails.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Order Status</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                <div className="relative flex items-start">
                  <div className="absolute left-4 w-0.5 h-full bg-gray-200"></div>
                  <div className="flex-shrink-0 z-10">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Order Confirmed</h3>
                    <p className="text-sm text-gray-500">Your order has been confirmed</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-500">Processing</h3>
                    <p className="text-sm text-gray-500">Your order is being processed</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-500">Shipped</h3>
                    <p className="text-sm text-gray-500">Your order is on the way</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Home className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-500">Delivered</h3>
                    <p className="text-sm text-gray-500">Your order has been delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6 text-center">
            A confirmation email has been sent to your email address.
          </p>

          <div className="flex flex-col space-y-3">
            <Link
              href="/products"
              className="block w-full py-3 bg-purple-600 text-white rounded-full font-bold text-center hover:bg-purple-700 transition-colors"
            >
              Continue Shopping {countdown > 0 && `(${countdown})`}
            </Link>
            <Link
              href="/orders"
              className="block w-full py-3 border border-purple-600 text-purple-600 rounded-full font-bold text-center hover:bg-purple-50 transition-colors"
            >
              View Order Details <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
