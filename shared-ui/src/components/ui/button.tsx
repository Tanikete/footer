import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@milka/shared-ui"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden group bg-[var(--milka-green)] text-[var(--milka-dark)] font-GHPBlack",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "relative overflow-hidden group bg-[var(--milka-dark)] font-bold text-lg rounded-3xl text-[var(--milka-white)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 p-6 font-bold text-xl rounded-3xl",
        form: "h-9 p-6 font-bold text-xl lg:text-2xl rounded-3xl"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isAnimated?: boolean;
  url?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isAnimated = true, url, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"


    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isAnimated ? (
          <>
            <a href={url} className="absolute left-0 bottom-0 w-full transform translate-y-full transition-transform duration-100 ease-out group-hover:-translate-y-2">
              {children}
            </a><a className="left-0 bottom-0 w-full transform translate-y-0 transition-transform duration-100 ease-out group-hover:-translate-y-10">
              {children}
            </a>
          </>
        ) : (
          <a href={url}>{children}</a>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
