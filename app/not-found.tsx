"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';


const NotFound = () => {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Left Content */}
      <div className="flex flex-col items-start space-y-6">
        <div className="inline-block bg-brand-yellow border-2 border-black px-3 py-1 text-xs font-black tracking-wider uppercase shadow-neobrutalism-sm transform -rotate-1">
          #404 Error Page
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-brand-dark leading-[1.1] tracking-tight">
          Oops! Page <br />
          <span className="scribble-underline">Not Found.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 font-medium max-w-lg leading-relaxed border-l-4 border-brand-yellow pl-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
          <Link href="/">
            <Button>
              Go Back Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button>
              Contact Support
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Content - Illustration Card */}
      <div className="relative w-full">
        {/* Main Card */}
        <div className="bg-brand-cream rounded-[2.5rem] border-4 border-black p-8 md:p-12 aspect-4/3 relative flex items-center justify-center overflow-visible shadow-neobrutalism-lg">

          {/* Main 404 Visual */}
          <div className="text-center relative z-10">
            <div className="text-[10rem] md:text-[12rem] leading-none font-black text-brand-purple drop-shadow-[4px_4px_0_rgba(0,0,0,1)] select-none">
              404
            </div>
            <div className="mt-4 bg-white border-2 border-black px-4 py-2 rounded-full inline-flex items-center gap-2 font-bold shadow-neobrutalism-sm">
              <span>Invalid URL Address</span>
            </div>
          </div>

          {/* Decorative Floating Badges */}

          {/* Top Left Badge */}
          <div className="absolute -top-6 -left-4 md:left-8 bg-white p-3 rounded-full border-2 border-black shadow-neobrutalism flex items-center justify-center animate-bounce duration-3000">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border border-black">
              <FaHouseChimneyWindow color='green' size='22px' />
            </div>
          </div>

          {/* Top Right Badge */}
          <div className="absolute -top-5 right-4 md:-right-6 bg-white px-4 py-2 rounded-2xl border-2 border-black shadow-neobrutalism flex items-center gap-3 z-20 hover:scale-105 transition-transform">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 36 36" className="w-10 h-10 transform -rotate-90">
                <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                <path className="text-red-500" strokeDasharray="10, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">0%</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-gray-500 font-bold uppercase">Success Rate</span>
              <span className="text-sm font-bold">Page Found</span>
            </div>
          </div>

          {/* Bottom Left Badge */}
          <div className="absolute -bottom-8 left-6 md:-left-8 bg-white px-5 py-3 rounded-2xl border-2 border-black shadow-neobrutalism flex items-center gap-3 z-20">
            <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center border-2 border-black text-white shadow-[2px_2px_0_0_#000]">
              <span className="font-bold text-lg">
                <FaSearch color='black' />
              </span>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-bold uppercase">Active Searchers</div>
              <div className='flex items-center gap-2'>
                <div className="text-xl font-black">50,000+</div>
              </div>
            </div>
          </div>

          {/* Background Pattern inside card */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" ></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
