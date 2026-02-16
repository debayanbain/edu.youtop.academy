"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import {
  Target,
  Eye,
  Users,
  Trophy,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const AboutPage = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative pt-12 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Badge variant="yellow" className="mb-4">
              Our Story
            </Badge>
          </motion.div>
          <motion.h1
            className="font-bold text-5xl sm:text-7xl leading-tight mb-6"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            Empowering Students <br />
            <span className="relative inline-block">
              <span className="px-2 z-10 relative">Across West Bengal.</span>
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
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 border-l-4 border-brutal-yellow pl-6 text-left sm:text-center sm:border-l-0 sm:pl-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            YouTOP Academy is committed to providing high-quality educational resources,
            suggestions, and notes for students appearing in Madhyamik, HS, and Competitive Exams.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg" className="group">
              Join Our Community <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Resources
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-brutal-yellow/10 py-16 sm:py-24 border-y-3 border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="card-brutal bg-white p-8 sm:p-12 relative overflow-hidden"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-4 right-4 text-brutal-yellow/20">
                <Target size={120} />
              </div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Target className="text-brutal-purple" /> Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To bridge the gap between education and accessibility by providing every
                student in West Bengal with the best study materials and expert guidance,
                regardless of their background or location.
              </p>
            </motion.div>

            <motion.div
              className="card-brutal bg-white p-8 sm:p-12 relative overflow-hidden"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-4 right-4 text-brutal-purple/20">
                <Eye size={120} />
              </div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Eye className="text-brutal-green" /> Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the most trusted and impactful educational companion for West
                Bengal&apos;s students, fostering a culture of excellence and lifelong
                learning through innovation and dedication.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Core Values</h2>
          <div className="h-2 w-24 bg-brutal-purple mx-auto border-2 border-border" />
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Sparkles,
              title: "Quality First",
              desc: "Every note and suggestion we provide is meticulously crafted and verified by experts.",
              color: "bg-amber-100"
            },
            {
              icon: Users,
              title: "Student Centric",
              desc: "We listen to our community and adapt our resources to meet their evolving needs.",
              color: "bg-green-100"
            },
            {
              icon: GraduationCap,
              title: "Transparency",
              desc: "Direct, honest, and reliable guidance for exams and career paths.",
              color: "bg-purple-100"
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              className="card-brutal bg-white p-8 text-center flex flex-col items-center group hover:bg-muted/50 transition-colors duration-500"
            >
              <div className={`p-4 rounded-2xl border-2 border-border mb-6 group-hover:scale-110 transition-transform duration-500 ${value.color}`}>
                <value.icon size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Impact Section ── */}
      <section className="relative overflow-hidden bg-brutal-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-8">Making a Real Difference.</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brutal-yellow p-3 rounded-lg border-2 border-white shadow-[4px_4px_0_0_#fff]">
                  <Users className="text-brutal-dark" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">50,000+ Active Students</h4>
                  <p className="text-gray-400">Relying on our suggestions and notes daily.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brutal-green p-3 rounded-lg border-2 border-white shadow-[4px_4px_0_0_#fff]">
                  <Trophy className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">90% Success Rate</h4>
                  <p className="text-gray-400">Based on student feedback and results.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brutal-purple p-3 rounded-lg border-2 border-white shadow-[4px_4px_0_0_#fff]">
                  <BookOpen className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">1,000+ Study Materials</h4>
                  <p className="text-gray-400">E-books, suggestions, and previous year papers.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="card-brutal bg-white p-2 sm:p-4 rotate-0 sm:rotate-3 transform transition-transform hover:rotate-0">
              <div className="aspect-video bg-muted rounded-lg border-2 border-border overflow-hidden relative group/img">
                <Image
                  fill
                  src="/images/student-success-testimonial.png"
                  alt="Student success testimonial"
                  placeholder="blur"
                  blurDataURL="/images/student-success-testimonial.png"
                  className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-brutal-yellow border-3 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <p className="text-brutal-dark font-bold italic text-sm sm:text-base">
                    &quot;YouTOP Academy changed the way I prepare for my HS exams. The suggestions were spot on!&quot;
                  </p>
                  <p className="text-xs mt-2 font-bold uppercase tracking-wider">— Rahul S., HS Candidate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8">Ready to Excel?</h2>
        <p className="text-xl text-muted-foreground mb-10">
          Join thousands of successful students and start your journey with the best
          resources available for West Bengal education.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="sm:w-64">
            Get Started Now
          </Button>
          <Button variant="outline" size="lg" className="sm:w-64">
            View Our Results
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;