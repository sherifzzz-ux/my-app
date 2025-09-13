import * as React from "react"
import { Skeleton } from "./skeleton"
import { cn } from "@/lib/utils"

// Skeleton pour les cartes de produits
export const ProductCardSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("rounded-lg border p-4 space-y-3", className),
        ref,
      },
      // Image skeleton
      React.createElement(
        Skeleton,
        {
          className: "h-48 w-full rounded-md"
        }
      ),
      // Content skeleton
      React.createElement(
        "div",
        { className: "space-y-2" },
        // Title skeleton
        React.createElement(
          Skeleton,
          {
            className: "h-4 w-3/4"
          }
        ),
        // Price skeleton
        React.createElement(
          Skeleton,
          {
            className: "h-4 w-1/2"
          }
        ),
        // Button skeleton
        React.createElement(
          Skeleton,
          {
            className: "h-8 w-full"
          }
        )
      )
    )
  }
)
ProductCardSkeleton.displayName = "ProductCardSkeleton"

// Skeleton pour les grilles de produits
export const ProductGridSkeleton = React.forwardRef<HTMLDivElement, { count?: number; className?: string }>(
  ({ count = 8, className }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("product-grid", className),
        ref,
      },
      Array.from({ length: count }).map((_, i) => (
        React.createElement(
          ProductCardSkeleton,
          {
            key: i,
            className: "animate-pulse"
          }
        )
      ))
    )
  }
)
ProductGridSkeleton.displayName = "ProductGridSkeleton"

// Skeleton pour les cartes de catégories
export const CategoryCardSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("relative overflow-hidden rounded-lg aspect-square", className),
        ref,
      },
      React.createElement(
        Skeleton,
        {
          className: "absolute inset-0"
        }
      ),
      React.createElement(
        "div",
        {
          className: "absolute inset-0 flex items-center justify-center"
        },
        React.createElement(
          "div",
          {
            className: "text-center space-y-2"
          },
          React.createElement(
            Skeleton,
            {
              className: "w-12 h-12 rounded-full mx-auto"
            }
          ),
          React.createElement(
            Skeleton,
            {
              className: "h-5 w-24 mx-auto"
            }
          )
        )
      )
    )
  }
)
CategoryCardSkeleton.displayName = "CategoryCardSkeleton"

// Skeleton pour les grilles de catégories
export const CategoryGridSkeleton = React.forwardRef<HTMLDivElement, { count?: number; className?: string }>(
  ({ count = 6, className }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("category-grid", className),
        ref,
      },
      Array.from({ length: count }).map((_, i) => (
        React.createElement(
          CategoryCardSkeleton,
          {
            key: i,
            className: "animate-pulse"
          }
        )
      ))
    )
  }
)
CategoryGridSkeleton.displayName = "CategoryGridSkeleton"

// Skeleton pour les listes
export const ListSkeleton = React.forwardRef<HTMLDivElement, { 
  count?: number; 
  showAvatar?: boolean; 
  className?: string 
}>(
  ({ count = 5, showAvatar = false, className }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("space-y-3", className),
        ref,
      },
      Array.from({ length: count }).map((_, i) => (
        React.createElement(
          "div",
          {
            key: i,
            className: "flex items-center space-x-3 p-3 rounded-lg border"
          },
          showAvatar && (
            React.createElement(
              Skeleton,
              {
                className: "w-10 h-10 rounded-full"
              }
            )
          ),
          React.createElement(
            "div",
            {
              className: "flex-1 space-y-2"
            },
            React.createElement(
              Skeleton,
              {
                className: "h-4 w-3/4"
              }
            ),
            React.createElement(
              Skeleton,
              {
                className: "h-3 w-1/2"
              }
            )
          )
        )
      ))
    )
  }
)
ListSkeleton.displayName = "ListSkeleton"

// Skeleton pour les formulaires
export const FormSkeleton = React.forwardRef<HTMLDivElement, { 
  fields?: number; 
  className?: string 
}>(
  ({ fields = 4, className }, ref) => {
    return React.createElement(
      "div",
      {
        className: cn("space-y-6", className),
        ref,
      },
      Array.from({ length: fields }).map((_, i) => (
        React.createElement(
          "div",
          {
            key: i,
            className: "space-y-2"
          },
          // Label skeleton
          React.createElement(
            Skeleton,
            {
              className: "h-4 w-1/4"
            }
          ),
          // Input skeleton
          React.createElement(
            Skeleton,
            {
              className: "h-10 w-full"
            }
          )
        )
      ))
    )
  }
)
FormSkeleton.displayName = "FormSkeleton"
