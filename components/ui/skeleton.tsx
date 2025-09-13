import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        success: "bg-success/20",
        warning: "bg-accent/20",
        destructive: "bg-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn(skeletonVariants({ variant, className })),
        ref,
        ...props,
      }
    )
  }
)
Skeleton.displayName = "Skeleton"

export { Skeleton }

// Composants Skeleton spécialisés
export const SkeletonText = React.forwardRef<HTMLDivElement, { lines?: number } & SkeletonProps>(
  ({ lines = 1, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("space-y-2", className),
        ref,
        ...props,
      },
      Array.from({ length: lines }).map((_, i) => (
        React.createElement(
          Skeleton,
          {
            key: i,
            className: cn(
              "h-4",
              i === lines - 1 && "w-3/4" // Dernière ligne plus courte
            )
          }
        )
      ))
    )
  }
)
SkeletonText.displayName = "SkeletonText"

export const SkeletonTitle = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return React.createElement(
      Skeleton,
      {
        className: cn("h-6 w-2/3", className),
        ref,
        ...props,
      }
    )
  }
)
SkeletonTitle.displayName = "SkeletonTitle"

export const SkeletonAvatar = React.forwardRef<HTMLDivElement, { size?: "sm" | "md" | "lg" } & SkeletonProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    }
    
    return React.createElement(
      Skeleton,
      {
        className: cn("rounded-full", sizeClasses[size], className),
        ref,
        ...props,
      }
    )
  }
)
SkeletonAvatar.displayName = "SkeletonAvatar"

export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("rounded-lg border p-4 space-y-3", className),
        ref,
        ...props,
      },
      React.createElement(SkeletonAvatar, { size: "md" }),
      React.createElement(
        "div",
        { className: "space-y-2" },
        React.createElement(SkeletonTitle, {}),
        React.createElement(SkeletonText, { lines: 2 })
      )
    )
  }
)
SkeletonCard.displayName = "SkeletonCard"

export { skeletonVariants }