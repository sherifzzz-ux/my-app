"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

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

interface ReviewsContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
  getProductReviews: (productId: string) => Review[]
  getAverageRating: (productId: string) => number
  markHelpful: (reviewId: string) => void
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "user1",
    userName: "Marie L.",
    rating: 5,
    title: "Excellent produit!",
    comment: "Ce sérum a vraiment transformé ma peau. Je le recommande vivement!",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    productId: "1",
    userId: "user2",
    userName: "Sophie M.",
    rating: 4,
    title: "Très satisfaite",
    comment: "Bon rapport qualité-prix, ma peau est plus douce après quelques semaines d'utilisation.",
    date: "2024-01-10",
    verified: true,
    helpful: 8,
  },
  {
    id: "3",
    productId: "2",
    userId: "user3",
    userName: "Amélie D.",
    rating: 5,
    title: "Parfait pour ma peau sensible",
    comment: "Enfin un nettoyant qui ne dessèche pas ma peau! Texture agréable et efficace.",
    date: "2024-01-12",
    verified: true,
    helpful: 15,
  },
]

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)

  const addReview = (reviewData: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }
    setReviews((prev) => [newReview, ...prev])
  }

  const getProductReviews = (productId: string) => {
    return reviews.filter((review) => review.productId === productId)
  }

  const getAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / productReviews.length) * 10) / 10
  }

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
        markHelpful,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider")
  }
  return context
}
