export interface Product {
  id: string
  name: string
  brand: string
  price: string
  originalPrice?: string
  image: string
  images?: string[]
  description: string
  shortDescription?: string
  category: string
  subcategory?: string
  inStock: boolean
  rating?: number
  reviewCount?: number
  ingredients?: string[]
  usage?: string[]
  benefits?: string[]
  skinType?: string[]
  tags?: string[]
  isNew?: boolean
  isOnSale?: boolean
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string
  price: string
  originalPrice?: string
  image?: string
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedVariant?: ProductVariant
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
}
