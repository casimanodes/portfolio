import { cn } from "@/lib/utils";

type BadgeColor = "primary" | "blue" | "green" | "pink" | "amber";

const colorMap: Record<BadgeColor, string> = {
  primary: "bg-primary-dim text-primary",
  blue: "bg-[rgba(76,169,201,0.15)] text-accent-blue",
  green: "bg-[rgba(76,201,122,0.15)] text-accent-green",
  pink: "bg-[rgba(201,76,122,0.15)] text-accent-pink",
  amber: "bg-[rgba(201,168,76,0.15)] text-accent-amber",
};

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ color = "primary", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[0.8rem] font-semibold tracking-wide",
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}
