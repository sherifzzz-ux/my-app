import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const headingVariants = cva(
  'font-serif font-semibold tracking-tight',
  {
    variants: {
      level: {
        1: 'text-4xl md:text-5xl lg:text-6xl',
        2: 'text-3xl md:text-4xl lg:text-5xl',
        3: 'text-2xl md:text-3xl lg:text-4xl',
        4: 'text-xl md:text-2xl lg:text-3xl',
        5: 'text-lg md:text-xl lg:text-2xl',
        6: 'text-base md:text-lg lg:text-xl',
      },
    },
    defaultVariants: {
      level: 1,
    },
  }
)

const textVariants = cva(
  'font-sans',
  {
    variants: {
      variant: {
        lead: 'text-lg md:text-xl text-muted-foreground leading-relaxed',
        body: 'text-base leading-relaxed',
        small: 'text-sm leading-relaxed',
        caption: 'text-xs text-muted-foreground',
        muted: 'text-sm text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'body',
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Component = as || `h${level}` as any
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, as = 'p', ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text'

export { Heading, Text, headingVariants, textVariants }
