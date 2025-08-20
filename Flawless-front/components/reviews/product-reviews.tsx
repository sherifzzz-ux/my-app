'use client'

import { useState } from 'react'
import { Star, ThumbsUp, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useReviews } from '@/contexts/reviews-context'
import { ReviewForm } from './review-form'

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { getProductReviews, getAverageRating, markHelpful } = useReviews()
  const [showReviewForm, setShowReviewForm] = useState(false)

  const reviews = getProductReviews(productId)
  const averageRating = getAverageRating(productId)

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? 'fill-pink-500 text-pink-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const distribution = getRatingDistribution()

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Avis clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(averageRating, 'md')}
              <p className="text-sm text-gray-600 mt-2">Basé sur {reviews.length} avis</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{
                        width:
                          reviews.length > 0
                            ? `${(distribution[rating as keyof typeof distribution] / reviews.length) * 100}%`
                            : '0%',
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {distribution[rating as keyof typeof distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-pink-600 hover:bg-pink-700"
            >
              Écrire un avis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm productId={productId} onClose={() => setShowReviewForm(false)} />
      )}

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 rounded-full p-2">
                    <User className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Achat vérifié
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markHelpful(review.id)}
                  className="text-gray-600 hover:text-pink-600"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Utile ({review.helpful})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Aucun avis pour ce produit.</p>
            <p className="text-sm text-gray-400 mt-2">Soyez le premier à laisser un avis!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
