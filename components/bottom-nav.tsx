"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Menu, Heart, User, ShoppingCart } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white border-t border-gray-200 py-3 fixed bottom-0 left-0 right-0 z-10">
      <div className="flex justify-around items-center">
        <Link
          href="/products"
          className={`flex flex-col items-center ${isActive("/products") ? "text-purple-600" : "text-gray-500"}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/categories"
          className={`flex flex-col items-center ${isActive("/categories") ? "text-purple-600" : "text-gray-500"}`}
        >
          <Menu className="h-6 w-6" />
          <span className="text-xs mt-1">Categories</span>
        </Link>
        <Link
          href="/favorites"
          className={`flex flex-col items-center ${isActive("/favorites") ? "text-purple-600" : "text-gray-500"}`}
        >
          <Heart className="h-6 w-6" />
          <span className="text-xs mt-1">Favorites</span>
        </Link>
        <Link
          href="/cart"
          className={`flex flex-col items-center ${isActive("/cart") ? "text-purple-600" : "text-gray-500"}`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Cart</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center ${isActive("/profile") ? "text-purple-600" : "text-gray-500"}`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
