import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "yellow" | "green" | "black";
  className?: string;
}

const variants: Record<string, string> = {
  blue: "bg-brutal-purple text-white",
  yellow: "bg-brutal-yellow text-brutal-dark",
  green: "bg-brutal-green text-white",
  black: "bg-brutal-black text-white",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  className = "",
}) => {
  return (
    <span className={cn("badge-brutal", variants[variant], className)}>
      {children}
    </span>
  );
};

export { Badge };
