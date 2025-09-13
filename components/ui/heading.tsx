import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-serif leading-tight text-primary-enhanced",
  {
    variants: {
      level: {
        1: "heading-1",
        2: "heading-2", 
        3: "heading-3",
        4: "heading-4",
        5: "heading-5",
        6: "heading-6",
      },
      variant: {
        default: "",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
      },
    },
    defaultVariants: {
      level: 2,
      variant: "default",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, variant, as, ...props }, ref) => {
    const Tag = as || (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6")
    
    return React.createElement(
      Tag,
      {
        className: cn(headingVariants({ level, variant, className })),
        ref,
        ...props,
      }
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
