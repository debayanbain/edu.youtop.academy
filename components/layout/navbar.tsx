"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuMenu, LuX, LuBookOpen } from 'react-icons/lu';
import { Button } from "../ui/button";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-card border-b-3 border-border sticky top-0 z-50"
      style={{ boxShadow: "0 4px 0px 0px var(--brutal-black)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
          <div className="hidden md:flex items-center gap-1">
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

          {/* Desktop CTA */}
          <div className="flex items-center">
            <div className="w-full flex justify-between gap-3">
              <Button variant={'purple'}>
                Get Pro
              </Button>
              <Button variant={'purple'}>
                Joi on Call
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 border-2 border-border rounded-lg flex items-center justify-center hover:bg-brutal-yellow/20 transition-colors"
          >
            {isOpen ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-border bg-card">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-sm font-bold hover:bg-brutal-yellow/30 rounded-md transition-colors border-2 border-transparent hover:border-border"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button variant={'purple'}>
                Get Pro
              </Button>
              <Button variant={'purple'}>
                Joi on Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
