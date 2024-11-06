import * as React from "react"

import { cn } from "@milka/shared-ui";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  animatePlaceholder?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (({ label, animatePlaceholder = true, className, type, placeholder, color, ...props }, ref) => {
    const id = props.id || placeholder?.toLowerCase().split(" ").join("_");
    return (
      <div className="relative group">
        {
          animatePlaceholder
            ? <label htmlFor={id} className={cn(`${props.disabled && 'opacity-60 '} text-white opacity-60 cursor-text select-none duration-75 ease-linear absolute bg-transparent -translate-y-1/2 text-lg ${props.value ? "top-0 text-sm" : "top-1/2"} group-focus-within:top-0 group-focus-within:text-blue85`, className)}>{placeholder}</label>
            : <label htmlFor={id} className={cn(`font-semibold text-sm absolute -top-[9px] bg-transparent px-0.5`)}>{label}</label>
        }
        <input
          type={type}
          id={id}
          className={cn(
            `flex h-10 w-full text-white bg-transparent border-b opacity-80 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-b disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          placeholder={!animatePlaceholder ? placeholder : undefined}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
  ))
Input.displayName = "Input"

export { Input }
