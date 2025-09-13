import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const formFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      state: {
        default: "",
        error: "text-destructive",
        success: "text-success",
        loading: "opacity-50 pointer-events-none",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string
  error?: string
  success?: string
  required?: boolean
  disabled?: boolean
  loading?: boolean
  helper?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    className, 
    state, 
    label, 
    error, 
    success, 
    required, 
    disabled, 
    loading, 
    helper, 
    children, 
    ...props 
  }, ref) => {
    const fieldState = error ? "error" : success ? "success" : loading ? "loading" : "default"
    
    return React.createElement(
      "div",
      {
        className: cn(formFieldVariants({ state: fieldState, className })),
        ref,
        ...props,
      },
      label && (
        React.createElement(
          "label",
          {
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          },
          label,
          required && React.createElement("span", { className: "text-destructive ml-1" }, "*")
        )
      ),
      React.createElement(
        "div",
        { className: "relative" },
        children
      ),
      (error || success || helper) && (
        React.createElement(
          "p",
          {
            className: cn(
              "text-sm",
              error && "text-destructive",
              success && "text-success",
              helper && !error && !success && "text-muted-foreground"
            )
          },
          error || success || helper
        )
      )
    )
  }
)
FormField.displayName = "FormField"

export { FormField, formFieldVariants }
