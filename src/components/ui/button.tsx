import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold text-[0.95rem] tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(91,141,239,0.35)]",
        outline:
          "border-[1.5px] border-border text-text hover:border-primary hover:text-primary hover:-translate-y-0.5",
        ghost: "text-muted hover:text-text hover:bg-surface",
      },
      size: {
        default: "px-7 py-3.5",
        lg: "px-9 py-[18px] text-[1.05rem]",
        sm: "px-5 py-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
