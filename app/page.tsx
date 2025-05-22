import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen auth-gradient">
      {/* Status bar mockup */}
      <div className="w-full px-4 py-2 flex justify-between items-center text-black">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-4">•••</div>
          <div className="h-3 w-4">📶</div>
          <div className="h-3 w-6">🔋</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center mb-12">
          <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold text-white mb-2">ShopEase</h1>
          <p className="text-white/80 text-lg">Your shopping companion</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <Link
            href="/login"
            className="block w-full py-4 bg-white text-black font-bold rounded-full text-center hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="block w-full py-4 bg-[#f2f2f7]/90 text-black font-bold rounded-full text-center hover:bg-[#f2f2f7] transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* iPhone home indicator */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mb-2 opacity-20"></div>
    </div>
  )
}
