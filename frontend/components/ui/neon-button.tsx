import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-[#31a39c]/5 hover:bg-[#31a39c]/10 border-[#31a39c]/20 text-[#31a39c]",
                solid: "bg-[#31a39c] hover:bg-[#2a8f88] text-white border-transparent hover:border-white/20",
                ghost: "border-transparent bg-transparent hover:border-[#31a39c]/50 hover:bg-white/5 text-white",
            },
            size: {
                default: "px-7 py-2",
                sm: "px-4 py-1",
                lg: "px-10 py-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-[#31a39c] via-[#31a39c] to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-[#31a39c] via-[#31a39c] to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
