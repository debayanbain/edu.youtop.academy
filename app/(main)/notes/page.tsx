"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notesStore, getClasses, getSubjects, Note } from "@/lib/data/notes";
import Link from "next/link";
import {
    LuFilter,
    LuBookText,
    LuGraduationCap,
    LuSearch,
    LuX,
    LuAward,
    LuZap,
    LuShieldCheck,
} from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface FilterContentProps {
    selectedClass: string | null;
    setSelectedClass: (cls: string | null) => void;
    selectedSubject: string | null;
    setSelectedSubject: (sub: string | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    classes: string[];
    subjects: string[];
}

const FilterContent = ({
    selectedClass,
    setSelectedClass,
    selectedSubject,
    setSelectedSubject,
    searchQuery,
    setSearchQuery,
    classes,
    subjects,
}: FilterContentProps) => (
    <div className="flex flex-col h-full px-2">
        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6 custom-scrollbar pb-6">
            {/* Search Section */}
            {/* <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                    <LuSearch className="w-3 h-3" /> খুঁজুন (Search)
                </label>
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="সার্চ করুন..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-border rounded-md focus:outline-none focus:ring-0 focus:border-brutal-purple bg-card font-bold text-sm shadow-[3px_3px_0_0_#000] transition-all focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_0_#000]"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                        >
                            <LuX size={16} />
                        </button>
                    )}
                </div>
            </div> */}

            {/* Class Filter Section */}
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                    <LuGraduationCap className="w-3 h-3" /> ক্লাস (Class)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                    <button
                        onClick={() => setSelectedClass(null)}
                        className={`px-3 py-1.5 border-2 rounded-md text-xs font-black transition-all text-center ${selectedClass === null
                            ? "bg-brutal-dark text-white border-brutal-dark shadow-[3px_3px_0_0_#000]"
                            : "bg-card border-border hover:bg-brutal-yellow/20 hover:border-brutal-yellow"
                            }`}
                    >
                        সব (All)
                    </button>
                    {classes.map((cls) => (
                        <button
                            key={cls}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-3 py-1.5 border-2 rounded-md text-xs font-black transition-all text-center ${selectedClass === cls
                                ? "bg-brutal-purple text-white border-brutal-dark shadow-[3px_3px_0_0_#000]"
                                : "bg-card border-border hover:bg-brutal-purple/10 hover:border-brutal-purple"
                                }`}
                        >
                            Class {cls}
                        </button>
                    ))}
                </div>
            </div>

            {/* Subject Filter Section */}
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                    <LuBookText className="w-3 h-3" /> বিষয় (Subject)
                </label>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedSubject(null)}
                        className={`w-full text-left px-3 py-2 border-2 rounded-md text-xs font-black transition-all ${selectedSubject === null
                            ? "bg-brutal-yellow text-brutal-dark border-brutal-dark shadow-[3px_3px_0_0_#000]"
                            : "bg-card border-border hover:bg-brutal-yellow/10"
                            }`}
                    >
                        সব বিষয় (All Subjects)
                    </button>
                    {subjects
                        .filter((sub) => sub !== "All Subjects")
                        .map((sub) => (
                            <button
                                key={sub}
                                onClick={() => setSelectedSubject(sub)}
                                className={`w-full text-left px-3 py-2 border-2 rounded-md text-xs font-black transition-all ${selectedSubject === sub
                                    ? "bg-brutal-green text-white border-brutal-dark shadow-[3px_3px_0_0_#000]"
                                    : "bg-card border-border hover:bg-brutal-green/10 hover:border-brutal-green"
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                </div>
            </div>
        </div>

        {/* Sticky Clear All Button at the bottom */}
        {(selectedClass || selectedSubject || searchQuery) && (
            <div className="pt-3 border-t-2 border-border mt-auto">
                <button
                    onClick={() => {
                        setSelectedClass(null);
                        setSelectedSubject(null);
                        setSearchQuery("");
                    }}
                    className={`w-full py-2 border-2 border-destructive border-dashed font-black text-xs text-destructive hover:bg-destructive hover:text-white transition-all rounded-md active:translate-y-0.5`}
                >
                    সব ফিল্টার মুছুন (Clear All)
                </button>
            </div>
        )}
    </div>
);

const FEATURES = [
    {
        icon: <LuShieldCheck className="w-5 h-5 text-brutal-green" />,
        title: "Expert Verified",
        bn: "বিশেষজ্ঞ দ্বারা যাচাইকৃত",
        color: "bg-brutal-green/10",
    },
    {
        icon: <LuZap className="w-5 h-5 text-brutal-yellow" />,
        title: "Instant PDF Access",
        bn: "তাত্ক্ষণিক পিডিএফ অ্যাক্সেস",
        color: "bg-brutal-yellow/10",
    },
    {
        icon: <LuAward className="w-5 h-5 text-brutal-purple" />,
        title: "Exam Focused",
        bn: "পরীক্ষা উপযোগী",
        color: "bg-brutal-purple/10",
    },
];

const NotesPage = () => {
    const { userId, getToken } = useAuth();
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [featureIndex, setFeatureIndex] = useState(0);

    // 1. Fetch Aggregated Notes from NestJS
    const { data: serverNotes } = useQuery({
        queryKey: ["notes", userId],
        queryFn: async () => {
            const token = await getToken();
            return apiClient.get<Note[]>("/notes", token ?? undefined);
        },
    });

    const classes = getClasses();
    const subjects = getSubjects();

    useEffect(() => {
        const timer = setInterval(() => {
            setFeatureIndex((prev) => (prev + 1) % FEATURES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const filteredNotes = (serverNotes || notesStore).filter((note) => {
        const classMatch = selectedClass ? note.class === selectedClass : true;
        const subjectMatch = selectedSubject
            ? note.subject === selectedSubject
            : true;
        const searchMatch = searchQuery
            ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return classMatch && subjectMatch && searchMatch;
    });

    return (
        <div className="min-h-screen bg-background text-foreground py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brutal-yellow border-2 border-border rounded-md shadow-[2px_2px_0_0_#000] mb-2 sm:mb-4">
                            <LuBookText className="w-4 h-4" />
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                                পাঠ্য উপকরণ (Study Material)
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
                            Premium <span className="text-brutal-purple">Notes</span>
                        </h1>
                        <p className="text-lg sm:text-xl font-medium max-w-2xl border-l-4 border-brutal-purple pl-4 text-muted-foreground">
                            Aces your exams with our hand-crafted, meticulously designed notes
                            for classes 5 to 12. Complete syllabus coverage.
                        </p>

                        {/* Mobile/Tablet Animated Badge */}
                        <div className="lg:hidden mt-4 h-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={featureIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-border shadow-[2px_2px_0_0_#000] ${FEATURES[featureIndex].color}`}
                                >
                                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                        {FEATURES[featureIndex].icon}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground whitespace-nowrap">
                                            {FEATURES[featureIndex].title}:
                                        </span>
                                        <span className="text-xs font-black whitespace-nowrap">
                                            {FEATURES[featureIndex].bn}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Desktop Quick Stats/Features Section */}
                    <div className="hidden lg:grid grid-cols-1 gap-4">
                        {FEATURES.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`card-brutal p-3 flex items-center gap-4 ${feature.color} border-2`}
                            >
                                <div className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#000]">
                                    {feature.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-muted-foreground leading-none mb-1">
                                        {feature.title}
                                    </p>
                                    <p className="font-bold text-sm leading-none">{feature.bn}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Filter Sticky Bar */}
                <div className="lg:hidden sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 border-b-2 border-border -mx-4 px-4 flex justify-between items-center">
                    <p className="font-bold text-sm">
                        <span className="text-brutal-purple">{filteredNotes.length}</span>{" "}
                        টি নোট দেখা যাচ্ছে
                    </p>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="btn-brutal btn-brutal-sm flex items-center gap-2">
                                <LuFilter size={14} /> ফিল্টার (Filter)
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="bg-background border-l-3 border-border w-80 flex flex-col h-full"
                        >
                            <SheetHeader className="pb-4 border-b-2 border-border mb-6">
                                <SheetTitle className="flex items-center gap-2 font-black uppercase">
                                    <LuFilter className="w-5 h-5" />
                                    ফিল্টার (Filters)
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex-1 overflow-hidden">
                                <FilterContent
                                    selectedClass={selectedClass}
                                    setSelectedClass={setSelectedClass}
                                    selectedSubject={selectedSubject}
                                    setSelectedSubject={setSelectedSubject}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    classes={classes}
                                    subjects={subjects}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Desktop Filters Sidebar */}
                    <div className="hidden lg:block lg:col-span-1 space-y-6">
                        <div className="card-brutal p-6 space-y-6 sticky top-24">
                            <div className="flex items-center gap-2 pb-4 border-b-2 border-border">
                                <LuFilter className="w-5 h-5" />
                                <h2 className="text-xl font-bold uppercase">
                                    ফিল্টার (Filters)
                                </h2>
                            </div>
                            <FilterContent
                                selectedClass={selectedClass}
                                setSelectedClass={setSelectedClass}
                                selectedSubject={selectedSubject}
                                setSelectedSubject={setSelectedSubject}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                classes={classes}
                                subjects={subjects}
                            />
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="lg:col-span-3">
                        <div className="hidden lg:flex mb-6 justify-between items-center">
                            <p className="font-bold text-lg">
                                {filteredNotes.length} টি নোট দেখা যাচ্ছে (Showing{" "}
                                {filteredNotes.length} Notes)
                            </p>
                        </div>

                        {filteredNotes.length === 0 ? (
                            <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
                                <p className="text-xl sm:text-2xl font-bold text-muted-foreground mb-4">
                                    No notes found matching your criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedClass(null);
                                        setSelectedSubject(null);
                                        setSearchQuery("");
                                    }}
                                    className="btn-brutal btn-brutal-outline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredNotes.map((note) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            key={note.id}
                                            className="h-full"
                                        >
                                            <Link
                                                href={`/notes/${note.id}`}
                                                className="block h-full cursor-pointer group"
                                            >
                                                <div className="card-brutal h-full flex flex-col bg-card overflow-hidden group-hover:bg-brutal-yellow/5">
                                                    {/* Image */}
                                                    <div className="aspect-4/3 border-b-3 border-border bg-muted relative overflow-hidden">
                                                        <Image
                                                            src={note.coverImage}
                                                            alt={note.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            width={400}
                                                            height={300}
                                                            priority={note.id.includes("class12")}
                                                        />
                                                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-2">
                                                            <span className="badge-brutal bg-brutal-yellow text-brutal-dark text-[10px] sm:text-xs">
                                                                Class {note.class}
                                                            </span>
                                                            <span className="badge-brutal bg-card text-foreground text-[10px] sm:text-xs">
                                                                {note.subject}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-4 sm:p-5 flex flex-col grow gap-2 sm:gap-3">
                                                        <h3 className="font-black text-lg sm:text-xl leading-tight line-clamp-2 uppercase">
                                                            {note.title}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm font-medium text-muted-foreground line-clamp-2 mb-1">
                                                            {note.description}
                                                        </p>

                                                        <div className="mt-auto flex items-end justify-between pt-3 sm:pt-4 border-t-2 border-border border-dashed">
                                                            <div>
                                                                <span className="text-[10px] sm:text-xs font-bold text-muted-foreground line-through decoration-destructive decoration-2 mr-2">
                                                                    ₹{note.originalPrice}
                                                                </span>
                                                                <span className="text-xl sm:text-2xl font-black text-brutal-purple">
                                                                    ₹{note.price}
                                                                </span>
                                                            </div>
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border bg-brutal-yellow flex items-center justify-center group-hover:-rotate-12 transition-transform shadow-[2px_2px_0_0_#000]">
                                                                <svg
                                                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
