import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  noPadding = false,
  hoverEffect = false,
}) => {
  return (
    <div
      className={cn(
        "card-brutal overflow-hidden",
        hoverEffect && "cursor-pointer",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card };
