"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuDownload,
  LuBookOpen,
  LuGraduationCap,
  LuTrophy,
} from 'react-icons/lu';
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";


const HeroSection = () => {
  return (
    <section className="relative pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            <Badge variant="yellow" className="mb-4">
              #1 Learning Platform in WB
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl leading-tight mb-6">
              Master Your <br />
              <span className="relative inline-block">
                <span className="px-2 box-decoration-slice z-10">
                  Exams Today.
                </span>
                {/* Animated SVG underline swoosh */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1213 73"
                  className="absolute -bottom-2 left-0 w-full h-auto -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <motion.path
                    d="M1212.41 5.51c3.05 12.87-22.36 11.93-30.26 15.68-94.32 20.51-269.09 32.42-365.48 37.51-77.91 3.82-155.66 9.93-233.67 11.67-57.49 2.56-115.05-.19-172.57 1.58-121.28.91-243.17 1.88-363.69-13.33-12.51-2.64-25.8-2.92-37.77-7.45-30.66-21.42 26.02-21.53 38.52-19.26 359.95 29.05 364.68 27.36 638.24 17.85 121-3.78 241.22-19.21 426.76-41.46 4.72-.65 9.18 3.56 8.45 8.36a941.74 941.74 0 0 0 54.29-9.21c9.33-2.33 18.7-4.56 27.95-7.19a7.59 7.59 0 0 1 9.23 5.24Z"
                    fill="none"
                    stroke="var(--brutal-yellow)"
                    strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.4,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M1212.41 5.51c3.05 12.87-22.36 11.93-30.26 15.68-94.32 20.51-269.09 32.42-365.48 37.51-77.91 3.82-155.66 9.93-233.67 11.67-57.49 2.56-115.05-.19-172.57 1.58-121.28.91-243.17 1.88-363.69-13.33-12.51-2.64-25.8-2.92-37.77-7.45-30.66-21.42 26.02-21.53 38.52-19.26 359.95 29.05 364.68 27.36 638.24 17.85 121-3.78 241.22-19.21 426.76-41.46 4.72-.65 9.18 3.56 8.45 8.36a941.74 941.74 0 0 0 54.29-9.21c9.33-2.33 18.7-4.56 27.95-7.19a7.59 7.59 0 0 1 9.23 5.24Z"
                    fill="var(--brutal-yellow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                  />
                </motion.svg>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 border-l-4 border-border pl-4">
              Get high-quality suggestions, notes, and e-books for Madhyamik,
              HS, and Competitive Exams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-brutal">
                Explore Courses <LuArrowRight size="20" />
              </Button>
              <Button className="bg-white" >
                Download App <LuDownload size="20" />
              </Button>
            </div>
          </div>

          {/* Right — Hero Image with floating badges */}
          <div className="relative z-10">
            <motion.div
              className="relative cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hover"
            >
              {/* Decorative background */}
              <motion.div
                className="absolute inset-0 -top-4 -right-4 -bottom-4 -left-4 bg-gradient-to-br from-amber-400 via-amber-200 to-amber-100 rounded-[32px] transform rotate-2 -z-10"
                variants={{ hover: { rotate: 4, scale: 1.03 } }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />

              {/* Image wrapper */}
              <motion.div
                className="overflow-hidden rounded-3xl border-3 border-border"
                style={{ boxShadow: "6px 6px 0px 0px var(--brutal-black)" }}
                variants={{
                  hover: {
                    boxShadow: "12px 12px 0px 0px var(--brutal-black)",
                    y: -4,
                    x: -4,
                  },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.img
                  src="images/pencile.jpg"
                  alt="Student with pencil illustration"
                  className="w-full h-[400px] object-contain bg-[#f5ebe0] scale-110"
                  variants={{ hover: { scale: 1.18 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </motion.div>

              {/* Floating Progress Badge — Top Right */}
              <motion.div
                className="absolute -top-4 -right-4 bg-card rounded-2xl border-2 border-border p-3 z-20 cursor-pointer backdrop-blur-sm"
                initial={{ opacity: 0, y: -30, x: 30, rotate: 10, boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
                animate={{ opacity: 1, y: 0, x: 0, rotate: 0, boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotate: -2,
                  boxShadow: "8px 8px 0px 0px var(--brutal-black)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        fill="none"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="var(--brutal-green)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        initial={{
                          strokeDasharray: "125.6",
                          strokeDashoffset: "125.6",
                        }}
                        animate={{ strokeDashoffset: "12.56" }}
                        transition={{
                          delay: 0.2,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-600">
                      90%
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-medium">
                      Success Rate
                    </p>
                    <p className="text-sm font-bold">Students Pass</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stats Card — Bottom Left */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl border-2 border-border p-4 z-20 cursor-pointer backdrop-blur-sm"
                initial={{ opacity: 0, y: 30, x: -30, rotate: -10, boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
                animate={{ opacity: 1, y: 0, x: 0, rotate: 0, boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.08,
                  y: 8,
                  rotate: 2,
                  boxShadow: "8px 8px 0px 0px var(--brutal-black)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-brutal-purple rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <LuGraduationCap size="20" color="white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Active Learners
                    </p>
                    <p className="text-lg font-bold">50,000+</p>
                  </div>
                </div>
              </motion.div> 

              {/* Floating Course Progress — Right Side */}
              <motion.div
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-linear-to-r from-purple-500 to-indigo-600 text-white rounded-2xl border-2 border-border p-3 z-20 cursor-pointer"
                initial={{ opacity: 0, x: 50, rotate: 5, boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
                animate={{ opacity: 1, x: 0, rotate: 0, boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.08,
                  x: 8,
                  rotate: -2,
                  boxShadow: "8px 8px 0px 0px var(--brutal-black)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <LuBookOpen size="20" />
                  </motion.div>
                  <div>
                    <p className="text-[10px] opacity-80">Daily Lessons</p>
                    <p className="text-sm font-bold">25+ Live</p>
                  </div>
                </div>
              </motion.div>

              {/* Small floating icon — Trophy */}
              <motion.div
                className="absolute top-4 left-4 bg-brutal-green rounded-full border-2 border-border p-2 z-20 cursor-pointer"
                initial={{ opacity: 0, scale: 0, rotate: -180, boxShadow: "3px 3px 0px 0px var(--brutal-black)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, boxShadow: "3px 3px 0px 0px var(--brutal-black)" }}
                transition={{
                  delay: 0.25,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.25,
                  rotate: 20,
                  boxShadow: "6px 6px 0px 0px var(--brutal-black)",
                }}
                whileTap={{ scale: 0.9, rotate: -10 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <LuTrophy size={20} color="white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
