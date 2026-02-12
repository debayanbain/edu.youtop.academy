import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold uppercase tracking-wide transition-all border-3 border-[var(--brutal-black)] shadow-[4px_4px_0_0_var(--brutal-black)] cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--brutal-black)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_var(--brutal-black)] focus-visible:ring-[3px] focus-visible:ring-[var(--brutal-yellow)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brutal-yellow)] text-[var(--brutal-dark)]",
        purple:
          "bg-[var(--brutal-purple)] text-white",
        green:
          "bg-[var(--brutal-green)] text-white",
        dark:
          "bg-[var(--brutal-dark)] text-white",
        orange:
          "bg-[var(--brutal-orange)] text-white",
        pink:
          "bg-[var(--brutal-pink)] text-white",
        destructive:
          "bg-destructive text-white",
        outline:
          "bg-transparent text-[var(--brutal-dark)] hover:bg-[var(--brutal-yellow)]",
        secondary:
          "bg-secondary text-secondary-foreground",
        ghost:
          "border-transparent shadow-none hover:bg-[var(--brutal-yellow)]/20 hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:shadow-none",
        link:
          "text-[var(--brutal-purple)] underline-offset-4 hover:underline border-transparent shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-10 px-5 py-2.5 text-sm has-[>svg]:px-3",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs border-2 shadow-[3px_3px_0_0_var(--brutal-black)] hover:shadow-[5px_5px_0_0_var(--brutal-black)] has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3.5 text-xs border-2 shadow-[3px_3px_0_0_var(--brutal-black)] hover:shadow-[5px_5px_0_0_var(--brutal-black)] has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-7 text-base border-3 shadow-[5px_5px_0_0_var(--brutal-black)] hover:shadow-[7px_7px_0_0_var(--brutal-black)] has-[>svg]:px-5",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md border-2 shadow-[3px_3px_0_0_var(--brutal-black)] hover:shadow-[5px_5px_0_0_var(--brutal-black)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 border-2 shadow-[3px_3px_0_0_var(--brutal-black)] hover:shadow-[5px_5px_0_0_var(--brutal-black)]",
        "icon-lg": "size-12 border-3 shadow-[5px_5px_0_0_var(--brutal-black)] hover:shadow-[7px_7px_0_0_var(--brutal-black)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
