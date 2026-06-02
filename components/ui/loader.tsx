"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "yellow" | "purple" | "green" | "orange" | "pink";
  layout?: "inline" | "block" | "fullscreen";
  text?: string;
  className?: string;
}

export const Loader = ({
  size = "md",
  color = "yellow",
  layout = "block",
  text = "Loading data...",
  className = "",
}: LoaderProps) => {
  const colorMap = {
    yellow: "bg-brutal-yellow",
    purple: "bg-brutal-purple text-white",
    green: "bg-brutal-green text-white",
    orange: "bg-brutal-orange text-white",
    pink: "bg-brutal-pink text-white",
  };

  const selectedColor = colorMap[color];

  // Inline Layout (e.g. inside a button or inline content)
  if (layout === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <motion.div
          className={cn(
            "border-2 border-brutal-black rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0",
            selectedColor,
            size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-10 h-10"
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <BookOpen size={size === "sm" ? 12 : size === "md" ? 16 : 20} className={color === "yellow" ? "text-brutal-black" : "text-white"} />
        </motion.div>
        {text && size !== "sm" && (
          <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-brutal-black select-none">
            {text}
          </span>
        )}
      </div>
    );
  }

  // Centered Block or Fullscreen Layout
  const isFullscreen = layout === "fullscreen";

  return (
    <div
      className={cn(
        isFullscreen
          ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center"
          : "w-full min-h-[250px] flex flex-col items-center justify-center p-6 border-3 border-dashed border-brutal-black/20 rounded-xl bg-card/10",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <motion.div
          className={cn(
            "relative border-4 border-brutal-black rounded-2xl flex items-center justify-center",
            selectedColor,
            size === "sm" ? "w-16 h-16" : size === "md" ? "w-24 h-24" : "w-32 h-32"
          )}
          style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen
            size={size === "sm" ? 28 : size === "md" ? 44 : 58}
            className={color === "yellow" ? "text-brutal-black" : "text-white"}
          />

          {/* Dash ring spinning */}
          <motion.div
            className="absolute -inset-5 border-3 border-dashed border-brutal-black rounded-full opacity-20 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Bouncing plus icon */}
          <motion.div
            className="absolute -top-3 -right-3 text-brutal-pink select-none pointer-events-none font-black text-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            +
          </motion.div>
        </motion.div>

        {text && (
          <div className="text-center space-y-1 select-none">
            <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight text-brutal-black">
              {text}
            </h3>
            <div className="flex justify-center gap-1.5 pt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 border-2 border-brutal-black rounded-full"
                  style={{
                    backgroundColor:
                      i === 0 ? "#ffcc00" : i === 1 ? "#7c6ff7" : "#22c55e",
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
