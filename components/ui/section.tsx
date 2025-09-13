import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "py-0",
        sm: "section-spacing-sm-enhanced",
        default: "section-spacing-enhanced", 
        lg: "section-spacing-lg-enhanced",
      },
      background: {
        default: "",
        muted: "bg-muted/50",
        primary: "bg-primary/5",
        secondary: "bg-secondary/50",
      },
      container: {
        true: "container-responsive",
        false: "",
      },
    },
    defaultVariants: {
      spacing: "default",
      background: "default",
      container: true,
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, container, as = "section", children, ...props }, ref) => {
    const Tag = as
    
    return React.createElement(
      Tag,
      {
        className: cn(sectionVariants({ spacing, background, container, className })),
        ref,
        ...props,
      },
      container ? (
        React.createElement("div", { className: "container-responsive" }, children)
      ) : (
        children
      )
    )
  }
)
Section.displayName = "Section"

export { Section, sectionVariants }
