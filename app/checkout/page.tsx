"use client"

import type React from "react"

import { useState } from "react"
import { StatusBar } from "@/components/status-bar"
import { ArrowLeft, CreditCard, Smartphone, BuildingIcon as BuildingBank, Check } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { paymentMethods, generateReference, initializePayment } from "@/services/payment-service"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [reference] = useState(generateReference())

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "Ghana",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getPaymentMethodIcon = (id: string) => {
    switch (id) {
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "momo":
        return <Smartphone className="h-5 w-5" />
      case "bank":
        return <BuildingBank className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Calculate total amount in pesewas (Ghana Cedis * 100)
      const amount = Math.round((totalPrice + 35 + totalPrice * 0.08) * 100)

      // Initialize payment with Paystack
      const paymentData = {
        amount,
        email: formData.email,
        reference,
        callbackUrl: `${window.location.origin}/payment-success`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.name,
            },
            {
              display_name: "Payment Method",
              variable_name: "payment_method",
              value: selectedPaymentMethod,
            },
          ],
        },
      }

      const response = await initializePayment(paymentData)

      if (response.status) {
        // Store order details in localStorage
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            reference,
            items,
            totalAmount: totalPrice + 35 + totalPrice * 0.08,
            shippingAddress: {
              name: formData.name,
              address: formData.address,
              city: formData.city,
              zip: formData.zip,
              country: formData.country,
              phone: formData.phone,
            },
            paymentMethod: selectedPaymentMethod,
            date: new Date().toISOString(),
          }),
        )

        // In a real app, redirect to Paystack checkout page
        // window.location.href = response.data.authorization_url;

        // For demo purposes, simulate successful payment
        setTimeout(() => {
          clearCart()
          router.push("/payment-success")
        }, 2000)
      } else {
        throw new Error("Payment initialization failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setLoading(false)
      alert("Payment failed. Please try again.")
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="flex flex-col min-h-screen auth-gradient">
      <StatusBar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex items-center">
          <Link href="/cart" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="content-card p-4">
            <h2 className="font-bold text-lg mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="0201234567"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    placeholder="Accra"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    placeholder="00233"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content-card p-4">
            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    selectedPaymentMethod === method.id
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                      selectedPaymentMethod === method.id ? "border-purple-600" : "border-gray-400"
                    }`}
                  >
                    {selectedPaymentMethod === method.id && <Check className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 text-gray-500">{getPaymentMethodIcon(method.id)}</div>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card p-4">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span>₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3"></div>
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₵{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>₵35.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>₵{(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₵{(totalPrice + 35 + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-purple-600 text-white rounded-full font-bold flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>Pay ₵{(totalPrice + 35 + totalPrice * 0.08).toFixed(2)}</>
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
