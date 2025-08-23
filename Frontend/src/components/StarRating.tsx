import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showNumber = true,
  readOnly = true,
  onRatingChange 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  const handleClick = (starValue: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const isFilled = rating >= starValue;
    const isHalf = rating >= starValue - 0.5 && rating < starValue;

    return (
      <button
        key={index}
        type="button"
        disabled={readOnly}
        onClick={() => handleClick(starValue)}
        className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
      >
        {isFilled ? (
          <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
        ) : isHalf ? (
          <StarHalf className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
        ) : (
          <Star className={`${sizeClasses[size]} text-gray-300`} />
        )}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      {showNumber && (
        <span className="text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}