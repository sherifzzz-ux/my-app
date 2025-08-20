'use client'

import type React from 'react'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useReviews } from '@/contexts/reviews-context'
import { useAuth } from '@/contexts/auth-context'

interface ReviewFormProps {
  productId: string
  onClose: () => void
}

export function ReviewForm({ productId, onClose }: ReviewFormProps) {
  const { addReview } = useReviews()
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || rating === 0 || !title.trim() || !comment.trim()) return

    setIsSubmitting(true)

    try {
      addReview({
        productId,
        userId: user.id,
        userName: user.name,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        verified: true,
      })

      // Reset form
      setRating(0)
      setTitle('')
      setComment('')
      onClose()
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-4">Vous devez être connecté pour laisser un avis.</p>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Écrire un avis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Note *</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-pink-500 text-pink-500'
                        : 'text-gray-300 hover:text-pink-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Titre de l'avis *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Résumez votre expérience"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Votre avis *
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience avec ce produit..."
              rows={4}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0 || !title.trim() || !comment.trim()}
              className="bg-pink-600 hover:bg-pink-700"
            >
              {isSubmitting ? 'Publication...' : "Publier l'avis"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
