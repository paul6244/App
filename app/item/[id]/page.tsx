"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/status-bar"
import { HomeIndicator } from "@/components/home-indicator"
import { ArrowLeft, Heart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  // Mock item data
  const item = {
    id: params.id,
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with tomato sauce, fresh mozzarella, basil, salt, and extra-virgin olive oil. Made with fresh ingredients and baked in a wood-fired oven.",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=500",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: 'Small (10")', price: 0 },
          { id: 2, name: 'Medium (12")', price: 2 },
          { id: 3, name: 'Large (14")', price: 4 },
        ],
      },
      {
        name: "Crust",
        required: true,
        items: [
          { id: 4, name: "Thin Crust", price: 0 },
          { id: 5, name: "Regular", price: 0 },
          { id: 6, name: "Thick Crust", price: 1 },
        ],
      },
      {
        name: "Extra Toppings",
        required: false,
        items: [
          { id: 7, name: "Extra Cheese", price: 1.5 },
          { id: 8, name: "Mushrooms", price: 1 },
          { id: 9, name: "Pepperoni", price: 1.5 },
          { id: 10, name: "Olives", price: 1 },
        ],
      },
    ],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    Size: item.options[0].items[0],
    Crust: item.options[1].items[0],
    "Extra Toppings": [],
  })

  const handleOptionSelect = (category: string, option: any) => {
    if (category === "Extra Toppings") {
      // For multi-select options
      const currentSelections = selectedOptions["Extra Toppings"] as any[]
      const isSelected = currentSelections.some((item) => item.id === option.id)

      if (isSelected) {
        setSelectedOptions({
          ...selectedOptions,
          [category]: currentSelections.filter((item) => item.id !== option.id),
        })
      } else {
        setSelectedOptions({
          ...selectedOptions,
          [category]: [...currentSelections, option],
        })
      }
    } else {
      // For single-select options
      setSelectedOptions({
        ...selectedOptions,
        [category]: option,
      })
    }
  }

  const calculateTotalPrice = () => {
    let total = item.price

    // Add size price
    total += selectedOptions.Size.price

    // Add crust price
    total += selectedOptions.Crust.price

    // Add toppings price
    const toppings = selectedOptions["Extra Toppings"] as any[]
    toppings.forEach((topping) => {
      total += topping.price
    })

    // Multiply by quantity
    total *= quantity

    return total.toFixed(2)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <StatusBar />

      {/* Item Header Image */}
      <div className="relative h-64">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        <button
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 text-black" />
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
          <Heart className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Item Info */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-black">{item.name}</h1>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <p className="text-purple-600 font-bold text-xl mt-2">${item.price.toFixed(2)}</p>
      </div>

      {/* Options */}
      <div className="px-6 py-4 flex-1">
        {item.options.map((optionGroup) => (
          <div key={optionGroup.name} className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-black">{optionGroup.name}</h2>
              {optionGroup.required && <span className="text-sm text-red-500">Required</span>}
            </div>
            <div className="space-y-2">
              {optionGroup.items.map((option) => {
                const isSelected =
                  optionGroup.name === "Extra Toppings"
                    ? (selectedOptions["Extra Toppings"] as any[]).some((item) => item.id === option.id)
                    : selectedOptions[optionGroup.name as keyof typeof selectedOptions]?.id === option.id

                return (
                  <div
                    key={option.id}
                    className={`p-3 rounded-xl border ${
                      isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200"
                    } flex justify-between items-center`}
                    onClick={() => handleOptionSelect(optionGroup.name, option)}
                  >
                    <span className="font-medium">{option.name}</span>
                    {option.price > 0 && <span className="text-purple-600">+${option.price.toFixed(2)}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Quantity */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-3">Quantity</h2>
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
            <span className="font-medium">Number of items</span>
            <div className="flex items-center">
              <button
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4 text-gray-700" />
              </button>
              <span className="mx-3 font-medium">{quantity}</span>
              <button
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <Button
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full py-3"
          onClick={() => {
            console.log("Added to cart:", {
              item,
              options: selectedOptions,
              quantity,
              totalPrice: calculateTotalPrice(),
            })
            router.push("/cart")
          }}
        >
          Add to Cart • ${calculateTotalPrice()}
        </Button>
      </div>

      <HomeIndicator />
    </div>
  )
}
