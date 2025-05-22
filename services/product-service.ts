// Product types
export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  stock: number
}

// Mock product data with Unsplash images
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    description: "Comfortable 100% cotton t-shirt with a modern fit. Perfect for everyday wear.",
    rating: 4.5,
    stock: 50,
  },
  {
    id: 2,
    name: "Ultra Boost Running Shoes",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Footwear",
    description: "Lightweight running shoes with responsive cushioning for maximum comfort during your runs.",
    rating: 4.8,
    stock: 25,
  },
  {
    id: 3,
    name: "Noise Cancelling Headphones",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    rating: 4.7,
    stock: 15,
  },
  {
    id: 4,
    name: "Classic Denim Jacket",
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    description: "Timeless denim jacket made from high-quality materials. Versatile and durable.",
    rating: 4.6,
    stock: 30,
  },
  {
    id: 5,
    name: "Fitness Smart Watch",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
    rating: 4.9,
    stock: 10,
  },
  {
    id: 6,
    name: "Water-Resistant Backpack",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    description: "Durable backpack with multiple compartments and water-resistant material.",
    rating: 4.4,
    stock: 40,
  },
  {
    id: 7,
    name: "Wireless Bluetooth Speaker",
    price: 499.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    description: "Portable Bluetooth speaker with 360° sound and 20-hour battery life.",
    rating: 4.3,
    stock: 20,
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    description: "Stylish sunglasses with UV protection and polarized lenses.",
    rating: 4.5,
    stock: 35,
  },
]

// Get all products
export function getAllProducts(): Product[] {
  return products
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

// Search products
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery),
  )
}
