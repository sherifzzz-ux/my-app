import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const formGroupVariants = cva(
  "space-y-4",
  {
    variants: {
      layout: {
        vertical: "space-y-4",
        horizontal: "space-y-4 md:space-y-0 md:space-x-4 md:flex md:items-start",
        grid: "grid gap-4",
        inline: "flex flex-wrap gap-4 items-end",
      },
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      },
    },
    defaultVariants: {
      layout: "vertical",
      columns: 1,
    },
  }
)

export interface FormGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formGroupVariants> {
  title?: string
  description?: string
  required?: boolean
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ 
    className, 
    layout, 
    columns, 
    title, 
    description, 
    required, 
    children, 
    ...props 
  }, ref) => {
    const groupClassName = cn(
      formGroupVariants({ layout, columns }),
      layout === "grid" && `grid-cols-${columns}`,
      className
    )
    
    return React.createElement(
      "div",
      {
        className: groupClassName,
        ref,
        ...props,
      },
      title && (
        React.createElement(
          "div",
          { className: "space-y-1" },
          React.createElement(
            "h3",
            {
              className: "text-sm font-medium leading-none"
            },
            title,
            required && React.createElement("span", { className: "text-destructive ml-1" }, "*")
          ),
          description && (
            React.createElement(
              "p",
              {
                className: "text-sm text-muted-foreground"
              },
              description
            )
          )
        )
      ),
      children
    )
  }
)
FormGroup.displayName = "FormGroup"

export { FormGroup, formGroupVariants }
