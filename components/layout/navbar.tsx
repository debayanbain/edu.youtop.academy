"use client";

import React from "react";
import Link from "next/link";
import { LuMenu, LuBookOpen } from 'react-icons/lu';
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "E-Books", href: "/ebooks" },
  { label: "Madhyamik", href: "/madhyamik" },
  { label: "HS", href: "/hs" },
  { label: "Results", href: "/results" },
  { label: "Scholarships", href: "/scholarships/svmcm" },
  { label: "News", href: "/news" },
];

const Navbar = () => {
  return (
    <nav
      className="bg-card border-b-3 border-border sticky top-0 z-50"
      style={{ boxShadow: "0 4px 0px 0px var(--brutal-black)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div
              className="w-10 h-10 bg-brutal-yellow rounded-lg border-2 border-border flex items-center justify-center group-hover:-translate-y-0.5 transition-transform"
              style={{ boxShadow: "3px 3px 0px 0px var(--brutal-black)" }}
            >
              <LuBookOpen size={25} />
            </div>
            <span className="text-xl font-black tracking-tight">
              You<span className="text-brutal-purple">TOP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-bold hover:bg-brutal-yellow/30 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA — hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="purple" size="sm">
              Get Pro
            </Button>
            <Button variant="purple" size="sm">
              Join on Call
            </Button>
          </div>

          {/* Mobile Menu — Sheet drawer */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="w-10 h-10 border-2 border-border rounded-lg flex items-center justify-center hover:bg-brutal-yellow/20 transition-colors"
                  aria-label="Open menu"
                >
                  <LuMenu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-card border-l-3 border-border w-70 sm:w-80 p-0"
                showCloseButton={true}
              >
                <SheetHeader className="border-b-3 border-border px-5 py-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brutal-yellow rounded-lg border-2 border-border flex items-center justify-center">
                      <LuBookOpen size={18} />
                    </div>
                    <span className="text-lg font-black tracking-tight">
                      You<span className="text-brutal-purple">TOP</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Nav Links */}
                <div className="flex flex-col px-4 py-3 gap-1">
                  {NAV_LINKS.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="block px-3 py-2.5 text-sm font-bold hover:bg-brutal-yellow/30 rounded-md transition-colors border-2 border-transparent hover:border-border"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-auto border-t-3 border-border px-4 py-4 flex flex-col gap-3">
                  <SheetClose asChild>
                    <Button variant="purple" className="w-full">
                      Get Pro
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="purple" className="w-full">
                      Join on Call
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
