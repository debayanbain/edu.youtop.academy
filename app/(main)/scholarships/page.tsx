"use client";

import React, { useState, useMemo } from "react";
import ScholarshipCard from "@/components/scholarships/scholarship-card";
import { FilterSidebar } from "@/components/scholarships/filter-sidebar";
import { scholarships, Scholarship as BaseScholarship } from "@/data/scholarships-data";
import { Search, SlidersHorizontal, Info, ChevronRight } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api";

interface Scholarship extends BaseScholarship {
    isOwned?: boolean;
}

const ScholarshipsPage = () => {
    const { userId, getToken } = useAuth();
    const [activeTab, setActiveTab] = useState<"Live" | "Upcoming" | "Always Open">("Live");
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        types: [] as string[],
        states: [] as string[],
        classes: [] as string[],
    });

    // 1. Fetch Aggregated Scholarships from NestJS
    const { data: serverScholarships } = useQuery({
        queryKey: ["scholarships", userId],
        queryFn: async () => {
            const token = await getToken();
            return apiClient.get<Scholarship[]>("/scholarships", token ?? undefined);
        },
    });

    const allScholarships = serverScholarships || scholarships;

    const handleFilterChange = (category: "types" | "states" | "classes", item: string) => {
        setFilters(prev => {
            const current = prev[category];
            const updated = current.includes(item)
                ? current.filter(i => i !== item)
                : [...current, item];
            return { ...prev, [category]: updated };
        });
    };

    const handleReset = () => {
        setFilters({
            types: [],
            states: [],
            classes: [],
        });
        setSearchQuery("");
    };

    const filteredScholarships = useMemo(() => {
        return allScholarships.filter((s) => {
            // Status Tab Filter
            const matchesTab = s.status === activeTab;

            // Search Query Filter
            const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Type Filter
            const matchesType = filters.types.length === 0 || filters.types.includes(s.type);

            // State Filter
            const matchesState = filters.states.length === 0 ||
                (s.type === "State" && filters.states.includes(s.state || "Other"));

            // Note: Class filter would need class list in data, skipping for now or matching loosely

            return matchesTab && matchesSearch && matchesType && matchesState;
        });
    }, [activeTab, searchQuery, filters, allScholarships]);

    const liveCount = allScholarships.filter(s => s.status === "Live").length;

    return (
        <div className="bg-nb-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Branding */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
                        Scholarships <span className="text-brutal-purple">for Indian Students</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT SIDEBAR - Desktop */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-8 h-[calc(100vh-4rem)] overflow-hidden">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onReset={handleReset}
                        />
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="lg:col-span-6 space-y-8">

                        {/* Search & Mobile Filter Trigger */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-brutal-purple transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search Category, Skills or Provider..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brutal-black font-bold focus:outline-none focus:shadow-[4px_4px_0_0_#A3E635] focus:bg-nb-lime/5 transition-all"
                                />
                            </div>

                            {/* Mobile Filter Button */}
                            <div className="lg:hidden">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <button className="btn-brutal h-full px-5">
                                            <SlidersHorizontal className="w-5 h-5" />
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="p-0 border-r-4 border-brutal-black bg-white w-75 flex flex-col h-full">
                                        <SheetHeader className="p-4 border-b-2 border-brutal-black shrink-0">
                                            <SheetTitle className="sr-only">Filters</SheetTitle>
                                        </SheetHeader>
                                        <div className="flex-1 overflow-hidden">
                                            <FilterSidebar
                                                className="border-0 shadow-none h-full"
                                                filters={filters}
                                                onFilterChange={handleFilterChange}
                                                onReset={handleReset}
                                                onClose={() => { }} // Could be linked to sheet close
                                            />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* Status Tabs */}
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setActiveTab("Live")}
                                className={`py-6 px-4 border-2 border-brutal-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_0_#000] transition-all flex flex-col items-center gap-1 ${activeTab === "Live" ? "bg-brutal-orange text-white" : "bg-white hover:bg-nb-bg"
                                    }`}
                            >
                                Live Scholarships
                                <span className="text-lg sm:text-2xl font-black">{liveCount}</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("Upcoming")}
                                className={`py-6 px-4 border-2 border-brutal-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_0_#000] transition-all flex flex-col items-center gap-1 ${activeTab === "Upcoming" ? "bg-brutal-purple text-white" : "bg-white hover:bg-nb-bg"
                                    }`}
                            >
                                Upcoming
                                <span className="text-lg sm:text-2xl font-black">24</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("Always Open")}
                                className={`py-6 px-4 border-2 border-brutal-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_0_#000] transition-all flex flex-col items-center gap-1 ${activeTab === "Always Open" ? "bg-brutal-green text-white" : "bg-white hover:bg-nb-bg"
                                    }`}
                            >
                                Always Open
                                <span className="text-lg sm:text-2xl font-black">12</span>
                            </button>
                        </div>

                        {/* Content Controls: Recently Posted vs Deadline */}
                        <div className="flex justify-end gap-3 text-[10px] sm:text-xs">
                            <button className="badge-brutal bg-white hover:bg-nb-bg text-muted-foreground hover:text-brutal-black transition-colors px-4 py-1.5 font-bold">Recently Posted</button>
                            <button className="badge-brutal bg-brutal-orange text-white px-4 py-1.5 font-bold shadow-[4px_4px_0_0_#000]">Deadline Date</button>
                        </div>

                        {/* Scholarship Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredScholarships.map((scholarship) => (
                                <div key={scholarship.id}>
                                    <ScholarshipCard scholarship={scholarship as Scholarship} />
                                </div>
                            ))}
                        </div>

                        {filteredScholarships.length === 0 && (
                            <div className="text-center py-20 bg-white border-2 border-brutal-black p-12 shadow-[8px_8px_0_0_#000]">
                                <h2 className="text-2xl font-black mb-4 uppercase">No matching scholarships!</h2>
                                <p className="font-bold text-muted-foreground mb-8">Try adjusting your search or filters.</p>
                                <button
                                    onClick={handleReset}
                                    className="btn-brutal"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}
                    </main>

                    {/* RIGHT SIDEBAR - Desktop Only */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-6 text-sm">

                        {/* Job Board style banner */}
                        <Card className="p-6 bg-brutal-black text-white space-y-4">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Looking for work?</h3>
                            <div className="space-y-2">
                                {["Full-Time", "Part-Time", "Seasonal Jobs"].map((type) => (
                                    <button key={type} className="w-full flex items-center justify-between p-3 bg-brutal-green text-white border-2 border-white/20 font-bold hover:bg-brutal-green/80 transition-all group text-sm">
                                        {type} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-center mt-2 underline decoration-brutal-green cursor-pointer">Know More</p>
                        </Card>

                        {/* Featured Scholarships Mini List */}
                        <Card className="p-0 border-2 overflow-hidden">
                            <div className="p-4 bg-brutal-yellow border-b-2 border-brutal-black">
                                <h3 className="font-black uppercase text-sm">Featured Scholarships</h3>
                            </div>
                            <div className="p-5 space-y-6 bg-white overflow-hidden">
                                {scholarships.filter(s => s.featured).map(s => (
                                    <Link key={s.id} href={`/scholarships/${s.slug}`} className="block group">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 bg-nb-bg border-2 border-brutal-black p-1 shrink-0">
                                                <img src={s.logo} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[12px] font-black leading-tight uppercase truncate group-hover:text-brutal-purple">{s.title}</h4>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{s.deadline}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6 bg-brutal-purple text-white relative overflow-hidden">
                            <Info className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rotate-12" />
                            <h3 className="text-lg font-black uppercase mb-2">Need Help?</h3>
                            <p className="text-xs font-bold leading-relaxed mb-4">Our guidance experts can help you choose the right scholarship for your career path.</p>
                            <button className="w-full py-2 bg-white text-brutal-purple font-black uppercase text-[10px] border-2 border-brutal-black shadow-[4px_4px_0_0_#000]">Get Consultation</button>
                        </Card>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default ScholarshipsPage;