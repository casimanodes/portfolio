import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-surface border border-border rounded-[20px] p-8 transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(91,141,239,0.12)] hover:-translate-y-1",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
