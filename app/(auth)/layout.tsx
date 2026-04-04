"use client";

import { motion } from "framer-motion";
import { LuBookOpen, LuGraduationCap, LuPencil, LuPlus, LuTrophy } from "react-icons/lu";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 bg-background relative overflow-hidden py-16 sm:py-24 min-h-[85vh] lg:min-h-200">
      {/* Neo-Brutal Decorative Background Elements (Edu-Themed) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        
        {/* Top-Left: Graduation Cap Card */}
        <motion.div
          className="absolute -top-6 -left-12 sm:top-20 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-brutal-yellow border-3 sm:border-4 border-brutal-black rounded-xl sm:rounded-2xl flex items-center justify-center -rotate-12 z-0 opacity-60 sm:opacity-100"
          style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
          animate={{
            rotate: [-12, -8, -12],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuGraduationCap className="w-10 h-10 sm:w-16 sm:h-16 text-brutal-black" />
        </motion.div>

        {/* Top-Right: Book Card */}
        <motion.div
          className="absolute top-10 -right-12 sm:top-40 sm:right-10 w-20 h-20 sm:w-28 sm:h-28 bg-brutal-purple border-3 sm:border-4 border-brutal-black rounded-xl flex items-center justify-center rotate-12 z-0 opacity-60 sm:opacity-100"
          style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
          animate={{
            rotate: [12, 18, 12],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuBookOpen className="w-8 h-8 sm:w-14 sm:h-14 text-white" />
        </motion.div>

        {/* Bottom-Left: Pencil Accent */}
        <motion.div
          className="absolute bottom-10 -left-6 sm:bottom-40 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-brutal-green border-3 border-brutal-black rounded-lg flex items-center justify-center rotate-45 z-0 opacity-60 sm:opacity-100"
          style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          animate={{
            rotate: [45, 35, 45],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <LuPencil className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
        </motion.div>

        {/* Bottom-Right: Trophy (Desktop Only) */}
        <motion.div
          className="absolute bottom-10 right-10 w-36 h-36 bg-brutal-orange border-4 border-brutal-black rounded-full hidden lg:flex items-center justify-center z-0 opacity-40 shrink-0"
          style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuTrophy className="w-16 h-16 text-white" />
        </motion.div>

        {/* Decorative Pluses (Mobile Friendly) */}
        <motion.div 
          className="absolute top-1/2 left-8 text-brutal-pink opacity-40 hidden sm:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <LuPlus size={32} strokeWidth={4} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-12 text-brutal-yellow opacity-40"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <LuPlus size={24} strokeWidth={4} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-4 flex justify-center my-auto">
        <div className="w-full max-w-110">
          {children}
        </div>
      </div>
    </div>
  );
}
