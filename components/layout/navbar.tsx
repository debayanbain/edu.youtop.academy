"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LuMenu, LuBookOpen } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";
import {
  useAuth,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "E-Books", href: "/ebooks" },
  { label: "Notes", href: "/notes" },
  { label: "Job Results", href: "/results" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Job News", href: "/news" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { userId, isLoaded } = useAuth();

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
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-bold rounded-md transition-colors relative group ${
                    isActive ? "text-brutal-dark" : "hover:bg-brutal-yellow/30"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-brutal-purple border-t border-border z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!isLoaded ? (
              <div className="w-20 h-10 animate-pulse bg-gray-200 rounded-md" />
            ) : !userId ? (
              <>
                <SignInButton mode="redirect">
                  <Button variant="outline" className="font-bold border-2">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <Button variant="purple" className="shadow-[3px_3px_0_0_#222222]">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center justify-between border-2 border-border bg-white rounded-lg shadow-[3px_3px_0_0_#222222] py-1 pl-3 pr-1 hover:-translate-y-0.5 transition-transform hover:shadow-[4px_4px_0_0_#222222]">
                <Link
                  href="/dashboard"
                  className="text-sm font-bold truncate hover:text-brutal-purple transition-colors mr-2.5"
                >
                  Dashboard
                </Link>
                <div className="bg-brutal-yellow rounded-full p-0.75 border-2 border-border shrink-0 flex items-center justify-center">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-6 h-6 rounded-full object-cover",
                        userButtonPopoverCard: "border-2 border-border shadow-[6px_6px_0_0_#222222] rounded-xl",
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu — Sheet drawer */}
          <div className="lg:hidden">
            <Sheet modal={false}>
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
                <div className="flex flex-col px-3 py-3 gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={`block px-3 py-3 text-sm font-bold rounded-md transition-all border-2 ${
                            isActive
                              ? "bg-brutal-yellow text-brutal-dark border-border shadow-[2px_2px_0_0_#000]"
                              : "hover:bg-brutal-yellow/20 border-transparent"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="mt-auto border-t-3 border-border px-4 py-4 flex flex-col gap-3">
                  {!isLoaded ? (
                    <div className="w-full h-10 animate-pulse bg-gray-200 rounded-md" />
                  ) : !userId ? (
                    <>
                      <SheetClose asChild>
                        <SignInButton mode="redirect">
                          <Button
                            variant="outline"
                            className="w-full border-2 border-border font-bold shadow-[3px_3px_0_0_#222222]"
                          >
                            Sign In
                          </Button>
                        </SignInButton>
                      </SheetClose>
                      <SheetClose asChild>
                        <SignUpButton mode="redirect">
                          <Button variant="purple" className="w-full">
                            Get Started Free
                          </Button>
                        </SignUpButton>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-2 pl-4 pr-2 border-2 border-border bg-white rounded-xl shadow-[4px_4px_0_0_#222222] mb-3">
                        <span className="text-sm font-bold text-foreground truncate">
                          Dashboard
                        </span>
                        <div className="bg-brutal-yellow rounded-full p-1 border-2 border-border shrink-0 flex items-center justify-center">
                          <UserButton
                            appearance={{
                              elements: {
                                avatarBox: "w-8 h-8 rounded-full object-cover",
                                userButtonPopoverCard: "border-2 border-border shadow-[6px_6px_0_0_#222222] rounded-xl",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Link href="/dashboard" className="w-full">
                          <Button variant="purple" className="w-full font-bold border-2 border-border shadow-[4px_4px_0_0_#222222] h-11 text-base">
                            Go to Dashboard
                          </Button>
                        </Link>
                      </SheetClose>
                    </>
                  )}
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
