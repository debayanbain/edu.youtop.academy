"use client";

import { motion } from "framer-motion";
import { LuGraduationCap } from "react-icons/lu";

export function AuthLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full max-w-sm mx-auto space-y-8 py-10">
      {/* Animated Edu-Brutal Logo Card */}
      <motion.div
        className="relative w-28 h-28 bg-brutal-yellow border-4 border-brutal-black rounded-2xl flex items-center justify-center"
        style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <LuGraduationCap size={56} className="text-brutal-black" />
        
        {/* Decorative rotating ring */}
        <motion.div
           className="absolute -inset-6 border-3 border-dashed border-brutal-black rounded-full opacity-20"
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating plus icons for extra flair */}
        <motion.div
          className="absolute -top-4 -right-4 text-brutal-pink"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl font-black">+</span>
        </motion.div>
      </motion.div>

      {/* Loading Message */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-black tracking-tighter uppercase text-brutal-black">
          Preparing your desk...
        </h2>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          High-quality education is worth the wait
        </p>

        {/* Brutalist Progress Dots */}
        <div className="flex justify-center gap-2 pt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 border-2 border-brutal-black rounded-full"
              style={{ backgroundColor: i === 0 ? "#ffcc00" : i === 1 ? "#7c6ff7" : "#22c55e" }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
