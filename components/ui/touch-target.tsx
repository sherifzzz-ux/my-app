import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const touchTargetVariants = cva('', {
  variants: {
    size: {
      sm: 'min-h-[36px] min-w-[36px]', // Minimum pour les petits boutons
      default: 'min-h-[44px] min-w-[44px]', // Apple HIG standard
      lg: 'min-h-[48px] min-w-[48px]', // Pour les boutons importants
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface TouchTargetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof touchTargetVariants> {}

const TouchTarget = React.forwardRef<HTMLDivElement, TouchTargetProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(touchTargetVariants({ size }), className)}
        {...props}
      />
    )
  }
)
TouchTarget.displayName = 'TouchTarget'

export { TouchTarget, touchTargetVariants }




