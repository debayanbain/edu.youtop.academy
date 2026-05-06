"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Filter,
  BookOpen,
  X,
  ChevronRight,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/layout/../ui/button";
import { Badge } from "@/components/layout/../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_BOOKS } from "@/lib/constants";
import { Book } from "@/lib/types";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const CLASSES = ["All Classes", "5", "6", "7", "8", "9", "10", "11", "12"];
const SUBJECTS = [
  "All Subjects",
  "History",
  "Physics",
  "Mathematics",
  "Science",
  "Bengali",
];

const TESTIMONIAL_AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    fallback: "JD",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    fallback: "AS",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    fallback: "MK",
  },
];

export default function EBooksPage() {
  const { userId, getToken } = useAuth();
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Book[]>([]);
  const { openCheckout } = useRazorpay();

  // 1. Fetch Aggregated E-books from NestJS
  const { data: serverBooks } = useQuery({
    queryKey: ["ebooks", userId],
    queryFn: async () => {
      const token = await getToken();
      return apiClient.get<Book[]>("/ebooks", token ?? undefined);
    },
  });

  const allBooks = useMemo(() => {
    // If server has data, use it; otherwise fall back to MOCK_BOOKS
    return (serverBooks && serverBooks.length > 0) ? serverBooks : MOCK_BOOKS;
  }, [serverBooks]);

  const handleDirectBuy = (book: Book) => {
    if (!userId) {
      router.push("/sign-up");
      return;
    }

    openCheckout({
      amount: book.price * 1, // Single item
      productType: "ebook",
      productId: book.id.toString(),
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  const handleCartCheckout = () => {
    if (cart.length === 0) return;
    
    // For cart, we'll use a virtual ID or just the first item + 'multi'
    const combinedId = cart.map(b => b.id).join(",");
    
    openCheckout({
      amount: cart.reduce((sum, item) => sum + item.price, 0),
      productType: "ebook",
      productId: `cart_${combinedId}`.substring(0, 50), // Limit length
      onSuccess: () => {
        setCart([]);
        router.push("/dashboard");
      },
    });
  };

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchClass =
        selectedClass === "All Classes" || book.class === selectedClass;
      const matchSubject =
        selectedSubject === "All Subjects" || book.subject === selectedSubject;
      const matchSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSubject && matchSearch;
    });
  }, [allBooks, selectedClass, selectedSubject, searchQuery]);

  const addToCart = (book: Book) => {
    if (!userId) {
      router.push("/sign-up");
      return;
    }
    setCart((prev) => [...prev, book]);
  };

  const removeFromCart = (bookId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-transparent pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6 lg:px-8 bg-white border-b-8 border-border">
        {/* Modern UI Background - Mesh Gradients & Abstract Shapes */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-brutal-purple/20 blur-[150px] rounded-full animate-pulse"
            style={{ animationDuration: "12s" }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-brutal-yellow/20 blur-[150px] rounded-full animate-pulse"
            style={{ animationDuration: "15s", animationDelay: "3s" }}
          />

          {/* Modern Dot Pattern for extra premium feel */}
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "radial-gradient(#000 0.8px, transparent 0.8px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Floating Abstract Shapes (Neo-Brutalist Modern) */}
          <motion.div
            animate={{
              translateY: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[12%] hidden xl:block"
          >
            <div className="w-64 h-80 bg-white border-4 border-border shadow-[12px_12px_0_0_#000] rotate-6 p-4 flex flex-col gap-4">
              <div className="w-full h-1/2 bg-brutal-purple border-2 border-border" />
              <div className="space-y-2">
                <div className="w-full h-3 bg-muted rounded-full" />
                <div className="w-full h-3 bg-muted rounded-full" />
                <div className="w-2/3 h-3 bg-muted rounded-full" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              translateY: [0, 30, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-10 left-[8%] hidden xl:block"
          >
            <div className="w-48 h-64 bg-white border-4 border-border shadow-[8px_8px_0_0_#000] -rotate-12 p-4 flex flex-col justify-between">
              <div className="w-12 h-12 bg-brutal-yellow border-2 border-border rounded-full" />
              <div className="space-y-2">
                <div className="w-full h-2 bg-muted rounded-full" />
                <div className="w-full h-2 bg-muted rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-10"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-white border-3 border-border shadow-[4px_4px_0_0_#000] rounded-full"
            >
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brutal-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brutal-purple"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brutal-dark">
                Session 2024-25 Live
              </span>
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-9xl font-black text-brutal-dark tracking-tighter leading-[0.85] uppercase">
                Master Your <br />
                <span className="relative inline-block text-brutal-purple drop-shadow-[4px_4px_0_#000]">
                  Learning
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-4 bg-brutal-yellow -z-10"
                  />
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-black leading-tight">
                PREMIUM E-BOOKS FOR CLASSES 5–12. <br />
                <span className="text-brutal-dark bg-brutal-blue/20 px-2 italic">
                  BUILT BY TOPPERS, CHOSEN BY THOUSANDS.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button
                variant="dark"
                size="lg"
                className="h-16 px-10 text-xl font-black shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                EXPLORE LIBRARY <ArrowRight className="ml-3 size-6" />
              </Button>

              <div className="flex items-center gap-4 px-6 py-4 bg-muted/20 border-3 border-dashed border-border rounded-2xl">
                <div className="flex -space-x-3">
                  {TESTIMONIAL_AVATARS.map((avatar, i) => (
                    <Avatar
                      key={i}
                      className="h-10 w-10 border-2 border-border shadow-[2px_2px_0_0_#000]"
                    >
                      <AvatarImage src={avatar.src} alt="User" className="object-cover" />
                      <AvatarFallback className="bg-brutal-yellow font-black text-xs">
                        {avatar.fallback}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-brutal-dark">
                    4.9/5 RATING
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    15k+ Reviews
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden lg:block space-y-8">
          <div className="sticky top-24">
            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="size-4" /> Classes
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {CLASSES.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-3 py-2 text-xs font-bold border-2 transition-all rounded-md ${
                        selectedClass === cls
                          ? "bg-brutal-yellow border-border shadow-[3px_3px_0_0_#000] -translate-x-0.5 -translate-y-0.5"
                          : "border-border/20 hover:border-border hover:bg-muted"
                      }`}
                    >
                      {cls === "All Classes" ? cls : `Class ${cls}`}
                    </button>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t-2 border-border/10">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="size-4" /> Subjects
                </h3>
                <div className="flex flex-col gap-1.5">
                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-bold border-2 transition-all rounded-md flex justify-between items-center group ${
                        selectedSubject === sub
                          ? "bg-brutal-purple border-border text-white shadow-[3px_3px_0_0_#000] -translate-x-0.5 -translate-y-0.5"
                          : "border-transparent hover:bg-muted"
                      }`}
                    >
                      {sub}{" "}
                      <ChevronRight
                        className={`size-4 transition-transform ${selectedSubject === sub ? "translate-x-1" : "group-hover:translate-x-1"}`}
                      />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-8">
          {/* Mobile Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-3 border-border rounded-xl font-bold transition-all focus:ring-4 focus:ring-brutal-yellow/30 outline-none shadow-[2px_2px_0_0_#000] focus:shadow-[4px_4px_0_0_#000]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 md:flex-none lg:hidden"
                  >
                    <Filter className="size-4" />
                  </Button>
                </SheetTrigger>
                {/* Mobile Filters content preserved separately in previous tool call */}
                <SheetContent
                  side="left"
                  className="w-75 border-r-4 border-border px-0"
                >
                  <SheetHeader className="px-6 pb-4 border-b-2 border-border">
                    <SheetTitle className="font-black text-2xl">
                      Filter Books
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-6 py-6 space-y-8 h-full overflow-y-auto">
                    <div>
                      <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                        <GraduationCap className="size-5 text-brutal-purple" />{" "}
                        Select Class
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {CLASSES.map((cls) => (
                          <button
                            key={cls}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-3 py-2 text-sm font-bold border-2 transition-all rounded-md ${
                              selectedClass === cls
                                ? "bg-brutal-yellow border-border shadow-[2px_2px_0_0_#000]"
                                : "border-transparent bg-muted/50"
                            }`}
                          >
                            {cls === "All Classes" ? cls : `Class ${cls}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t-2 border-border">
                      <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                        <BookOpen className="size-5 text-brutal-blue" /> Select
                        Subject
                      </h4>
                      <div className="space-y-2">
                        {SUBJECTS.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubject(sub)}
                            className={`w-full text-left px-4 py-2 text-sm font-bold border-2 transition-all rounded-md flex justify-between items-center ${
                              selectedSubject === sub
                                ? "bg-brutal-blue border-border text-white shadow-[2px_2px_0_0_#000]"
                                : "border-transparent bg-muted/50"
                            }`}
                          >
                            {sub}{" "}
                            <ChevronRight
                              className={`size-4 ${selectedSubject === sub ? "translate-x-1" : ""}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-10">
                      <Button
                        className="w-full"
                        variant="dark"
                        onClick={() => {
                          setSelectedClass("All Classes");
                          setSelectedSubject("All Subjects");
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="dark"
                    className="flex-1 md:flex-none relative h-full min-h-13.5 shadow-[4px_4px_0_0_#000]"
                  >
                    <ShoppingCart className="size-5 md:mr-2" />
                    <span className="hidden md:inline">Cart</span>
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-brutal-yellow text-brutal-dark text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-border shadow-[1px_1px_0_0_#000]">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md p-0 border-l-8 border-border">
                  <div className="h-full flex flex-col">
                    <div className="p-6 border-b-4 border-border bg-brutal-yellow flex items-center justify-between">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-3 font-black text-3xl uppercase tracking-tighter">
                          <ShoppingCart className="size-8" />
                          Cart{" "}
                          <span className="bg-brutal-dark text-white px-2 rounded-lg text-lg ml-2">
                            {cart.length}
                          </span>
                        </SheetTitle>
                      </SheetHeader>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-brutal-purple/20">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                          <div className="relative">
                            <div className="absolute inset-0 bg-brutal-purple/10 blur-2xl rounded-full animate-pulse" />
                            <div className="relative w-32 h-32 border-4 border-dashed border-border/30 rounded-full flex items-center justify-center">
                              <ShoppingCart className="size-16 text-muted-foreground/30" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="font-black text-3xl uppercase tracking-tighter text-muted-foreground/40 italic">
                              Empty Library
                            </p>
                            <p className="text-sm font-bold text-muted-foreground/50 max-w-50 mx-auto leading-tight">
                              Your favorite notes are waiting to be added!
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="border-2 font-black"
                            onClick={() => {
                              /* Close sheet logic would go here if we had a ref */
                            }}
                          >
                            Browse E-books
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cart.map((item, idx) => (
                            <motion.div
                              key={`${item.id}-${idx}`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="group flex gap-4 p-4 border-4 border-border rounded-xl bg-white shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                            >
                              <div
                                className={`w-20 h-24 ${item.coverColor} rounded-lg border-2 border-border shrink-0 shadow-[2px_2px_0_0_#000] relative overflow-hidden`}
                              >
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-black text-base leading-tight uppercase line-clamp-1">
                                      {item.title}
                                    </h4>
                                    <p className="text-[9px] font-bold uppercase text-muted-foreground/60 mt-0.5 tracking-tight">
                                      Class {item.class} • {item.subject}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-1.5 border-2 border-transparent hover:border-red-500 hover:bg-red-50 rounded-lg text-red-500 transition-all"
                                  >
                                    <X className="size-4" />
                                  </button>
                                </div>
                                <div className="flex justify-between items-end">
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="blue"
                                      className="text-[10px] px-1.5 font-black uppercase border-2"
                                    >
                                      PDF
                                    </Badge>
                                  </div>
                                  <p className="font-black text-xl text-brutal-purple">
                                    ₹{item.price}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="p-6 bg-muted/10 border-t-4 border-border space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-muted-foreground font-bold">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                          </div>
                          <div className="flex justify-between items-center text-muted-foreground font-bold">
                            <span>GST (18%)</span>
                            <span className="text-xs italic uppercase">
                              Included
                            </span>
                          </div>
                          <div className="flex justify-between items-center font-black text-3xl pt-2 border-t-2 border-dashed border-border">
                            <span>TOTAL</span>
                            <span className="text-brutal-purple drop-shadow-[2px_2px_0_#000]">
                              ₹{cartTotal}
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-full text-2xl h-18 font-black shadow-[6px_6px_0_0_#000] uppercase tracking-tighter"
                          variant="purple"
                          onClick={handleCartCheckout}
                        >
                          Secure Checkout <ArrowRight className="ml-3 size-8" />
                        </Button>
                        <p className="text-[10px] text-center font-black text-muted-foreground uppercase tracking-widest">
                          Instant access after payment
                        </p>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <div className="group h-full flex flex-col bg-white border-3 border-border rounded-xl overflow-hidden shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
                      {/* Cover Area */}
                      <div
                        className={`aspect-4/5 ${book.coverColor} relative p-6 flex flex-col justify-between overflow-hidden cursor-default`}
                      >
                        <div className="flex justify-between items-start relative z-20">
                          <Badge
                            variant="yellow"
                            className="text-[10px] p-1.5 border-2 shadow-[2px_2px_0_0_#000]"
                          >
                            {book.tag}
                          </Badge>
                          {!book.isOwned && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(book);
                              }}
                              className="bg-white border-2 border-border p-2 rounded-lg shadow-[3px_3px_0_0_#000] hover:bg-brutal-yellow transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                              <ShoppingCart className="size-5" />
                            </button>
                          )}
                        </div>

                        <div className="relative z-10">
                          <div className="w-12 h-1.5 bg-white/40 rounded-full mb-3" />
                          <h3 className="font-black text-white text-2xl leading-tight drop-shadow-lg group-hover:scale-105 transition-transform origin-left duration-500">
                            {book.title}
                          </h3>
                        </div>

                        {/* Aesthetic Grid Pattern Overlay */}
                        <div
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #000 1px, transparent 1px)",
                            backgroundSize: "12px 12px",
                          }}
                        />
                      </div>

                      {/* Info Area */}
                      <div className="p-5 flex flex-col flex-1 bg-white border-t-3 border-border">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-muted-foreground border-b-2 border-brutal-yellow pb-0.5">
                              Class {book.class}
                            </span>
                            <span className="size-1 rounded-full bg-muted-foreground/30" />
                            <span className="text-[10px] font-black uppercase text-muted-foreground pb-0.5">
                              {book.subject}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-600 line-clamp-3 leading-relaxed">
                            {book.description}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-muted-foreground/60 line-through">
                              ₹{book.originalPrice}
                            </span>
                            <span className="text-2xl font-black text-brutal-dark">
                              ₹{book.price}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant={book.isOwned ? "purple" : "dark"}
                            className="px-4 shadow-[3px_3px_0_0_#000]"
                            onClick={() => book.isOwned ? router.push(`/ebooks/${book.id}`) : handleDirectBuy(book)}
                          >
                            {book.isOwned ? "READ NOW" : "BUY NOW"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-muted/30 border-4 border-dashed border-border/30 rounded-full flex items-center justify-center">
                    <Search className="size-12 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black">No matching books</h3>
                    <p className="text-muted-foreground font-medium">
                      Try different filters or search terms.
                    </p>
                  </div>
                  <Button
                    variant="dark"
                    className="px-8"
                    onClick={() => {
                      setSelectedClass("All Classes");
                      setSelectedSubject("All Subjects");
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
