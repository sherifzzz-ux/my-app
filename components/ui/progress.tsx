import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
      },
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        success: "bg-success/20",
        warning: "bg-accent/20",
        destructive: "bg-destructive/20",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 bg-primary transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        success: "bg-success",
        warning: "bg-accent",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  showValue?: boolean
  label?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    size, 
    variant, 
    value = 0, 
    max = 100, 
    showValue = false, 
    label, 
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    return React.createElement(
      "div",
      {
        className: cn("space-y-2", className),
        ref,
        ...props,
      },
      label && (
        React.createElement(
          "div",
          {
            className: "flex justify-between items-center"
          },
          React.createElement(
            "span",
            {
              className: "text-sm font-medium"
            },
            label
          ),
          showValue && (
            React.createElement(
              "span",
              {
                className: "text-sm text-muted-foreground"
              },
              `${Math.round(percentage)}%`
            )
          )
        )
      ),
      React.createElement(
        "div",
        {
          className: cn(progressVariants({ size, variant }))
        },
        React.createElement(
          "div",
          {
            className: cn(progressIndicatorVariants({ variant })),
            style: { width: `${percentage}%` }
          }
        )
      )
    )
  }
)
Progress.displayName = "Progress"

export { Progress, progressVariants, progressIndicatorVariants }