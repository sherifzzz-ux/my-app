import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva(
  "leading-relaxed",
  {
    variants: {
      variant: {
        lead: "text-lead",
        body: "text-body", 
        "body-sm": "text-body-sm",
        caption: "text-caption",
      },
      as: {
        p: "",
        span: "",
        div: "",
      },
    },
    defaultVariants: {
      variant: "body",
      as: "p",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div"
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Tag = as || "p"
    
    return React.createElement(
      Tag,
      {
        className: cn(textVariants({ variant, as, className })),
        ref,
        ...props,
      }
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
