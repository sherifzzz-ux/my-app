import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, CheckCircle } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export function ProductReviews({ 
  productId, 
  reviews = [], 
  averageRating = 4.5, 
  totalReviews = 0 
}: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    userName: ""
  });

  // Mock reviews if none provided
  const mockReviews: Review[] = reviews.length > 0 ? reviews : [
    {
      id: "1",
      userName: "Aminata D.",
      rating: 5,
      title: "Excellent produit !",
      comment: "Je recommande vivement ce produit. Texture agréable et résultats visibles dès la première utilisation.",
      date: "2024-01-15",
      verified: true,
      helpful: 12
    },
    {
      id: "2", 
      userName: "Fatou M.",
      rating: 4,
      title: "Très satisfaite",
      comment: "Bon produit, conforme à mes attentes. Livraison rapide. Je rachèterai certainement.",
      date: "2024-01-10",
      verified: true,
      helpful: 8
    },
    {
      id: "3",
      userName: "Khadija S.",
      rating: 5,
      title: "Parfait pour ma peau",
      comment: "Enfin un produit qui convient à ma peau sensible. Aucune irritation et un fini naturel.",
      date: "2024-01-08",
      verified: false,
      helpful: 5
    }
  ];

  const totalMockReviews = mockReviews.length;

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 60 },
    { stars: 4, count: 23, percentage: 30 },
    { stars: 3, count: 6, percentage: 8 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const handleSubmitReview = () => {
    // Handle review submission
    console.log("New review:", newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 0, title: "", comment: "", userName: "" });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Avis clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{averageRating}</div>
              <StarRating rating={averageRating} size="lg" />
              <p className="text-sm text-muted-foreground mt-2">
                Basé sur {totalMockReviews} avis
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{item.stars}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Avis détaillés</h3>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Écrire un avis
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Donnez votre avis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Votre note</label>
              <StarRating 
                rating={newReview.rating} 
                readOnly={false}
                showNumber={false}
                onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Votre nom</label>
              <Input 
                placeholder="Votre nom (affiché publiquement)"
                value={newReview.userName}
                onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Titre de l'avis</label>
              <Input 
                placeholder="Résumez votre expérience"
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Votre commentaire</label>
              <Textarea 
                placeholder="Partagez votre expérience avec ce produit..."
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitReview}>Publier l'avis</Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {review.userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Achat vérifié
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" showNumber={false} />
              </div>
              
              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-muted-foreground mb-4">{review.comment}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                  <ThumbsUp className="h-4 w-4" />
                  Utile ({review.helpful})
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Import Star component for rating distribution
import { Star } from "lucide-react";