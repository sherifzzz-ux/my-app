'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

const toastVariants = cva(
  "fixed top-4 right-4 z-50 max-w-sm w-full bg-background border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-success bg-success/10",
        error: "border-destructive bg-destructive/10",
        warning: "border-accent bg-accent/10",
        info: "border-primary bg-primary/10",
      },
      position: {
        top: "top-4",
        bottom: "bottom-4",
        center: "top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
  showCloseButton?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant, 
    position, 
    title, 
    description, 
    onClose, 
    duration = 5000, 
    showCloseButton = true, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)
    
    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => onClose?.(), 300) // Attendre l'animation de sortie
        }, duration)
        
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])
    
    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }
    
    const getIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-success" />
        case "error":
          return <AlertCircle className="h-5 w-5 text-destructive" />
        case "warning":
          return <AlertTriangle className="h-5 w-5 text-accent" />
        case "info":
          return <Info className="h-5 w-5 text-primary" />
        default:
          return <Info className="h-5 w-5 text-muted-foreground" />
      }
    }
    
    if (!isVisible) return null
    
    return React.createElement(
      "div",
      {
        className: cn(
          toastVariants({ variant, position }),
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
          className
        ),
        ref,
        ...props,
      },
      React.createElement(
        "div",
        { className: "flex items-start space-x-3" },
        getIcon(),
        React.createElement(
          "div",
          { className: "flex-1 space-y-1" },
          title && (
            React.createElement(
              "h4",
              {
                className: "text-sm font-medium leading-none"
              },
              title
            )
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
        ),
        showCloseButton && (
          React.createElement(
            "button",
            {
              onClick: handleClose,
              className: "text-muted-foreground hover:text-foreground transition-colors"
            },
            React.createElement(X, { className: "h-4 w-4" })
          )
        )
      )
    )
  }
)
Toast.displayName = "Toast"

// Hook pour gérer les toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState<Array<ToastProps & { id: string }>>([])
  
  const addToast = React.useCallback((toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    return id
  }, [])
  
  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])
  
  const toast = {
    success: (title: string, description?: string) => 
      addToast({ variant: "success", title, description }),
    error: (title: string, description?: string) => 
      addToast({ variant: "error", title, description }),
    warning: (title: string, description?: string) => 
      addToast({ variant: "warning", title, description }),
    info: (title: string, description?: string) => 
      addToast({ variant: "info", title, description }),
  }
  
  return { toasts, toast, removeToast }
}

// Composants supplémentaires pour le toaster
const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "toast-provider" }, children)
}

const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return React.createElement(
    "div",
    {
      className: `text-sm font-medium leading-none ${className || ""}`,
      ref,
      ...props,
    }
  )
})
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return React.createElement(
    "p",
    {
      className: `text-sm text-muted-foreground ${className || ""}`,
      ref,
      ...props,
    }
  )
})
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return React.createElement(
    "button",
    {
      className: `text-muted-foreground hover:text-foreground transition-colors ${className || ""}`,
      ref,
      ...props,
    },
    React.createElement(X, { className: "h-4 w-4" })
  )
})
ToastClose.displayName = "ToastClose"

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return React.createElement("div", {
    className: `fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className || ""}`,
    ref,
    ...props,
  })
})
ToastViewport.displayName = "ToastViewport"

export { 
  Toast, 
  ToastProvider, 
  ToastTitle, 
  ToastDescription, 
  ToastClose, 
  ToastViewport,
  toastVariants 
}