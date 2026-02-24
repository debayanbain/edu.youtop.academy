import React from "react";
import Link from "next/link";
import { Scholarship } from "@/data/scholarships-data";
import { Card } from "@/components/ui/card";
import { Calendar, Award, UserCheck, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScholarshipCardProps {
    scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
    return (
        <Card hoverEffect className="flex flex-col h-full bg-white dark:bg-brutal-dark p-0 overflow-hidden group">
            {/* Top Section: Logo & Deadline */}
            <div className="p-5 flex justify-between items-center border-b-2 border-brutal-black">
                <div className="w-24 h-12 relative flex items-center justify-start grayscale group-hover:grayscale-0 transition-all">
                    <img
                        src={scholarship.logo}
                        alt={scholarship.provider}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                        <span className={cn(
                            "text-[10px] font-black uppercase px-2 py-0.5 border-2 border-brutal-black shadow-[2px_2px_0_0_#000]",
                            scholarship.type === "State" ? "bg-brutal-purple text-white" :
                                scholarship.type === "National" ? "bg-brutal-orange text-white" :
                                    "bg-brutal-green text-white"
                        )}>
                            {scholarship.type} {scholarship.state === "West Bengal" ? ": WB" : ""}
                        </span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">Deadline</span>
                        <div className="flex items-center gap-1.5 font-bold text-sm">
                            <Calendar className="w-3.5 h-3.5 text-brutal-purple" />
                            {scholarship.deadline}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-5 flex-1 flex flex-col">
                {scholarship.featured && (
                    <div className="mb-3">
                        <span className="bg-brutal-green text-white text-[10px] font-black uppercase px-2 py-0.5 border-2 border-brutal-black shadow-[2px_2px_0_0_#000]">
                            Featured
                        </span>
                    </div>
                )}

                <h3 className="text-lg font-black mb-4 leading-tight uppercase tracking-tight group-hover:text-brutal-purple transition-colors">
                    {scholarship.title}
                </h3>

                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                            <Award className="w-3 h-3 text-brutal-yellow" /> Award
                        </div>
                        <p className="text-sm font-bold leading-snug line-clamp-2">
                            {scholarship.awardDetails}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                            <UserCheck className="w-3 h-3 text-brutal-green" /> Eligibility
                        </div>
                        <p className="text-sm font-bold leading-snug line-clamp-2">
                            {scholarship.eligibilitySummary}
                        </p>
                    </div>
                </div>

                {/* Footer info/badges */}
                <div className="mt-auto pt-4 border-t-2 border-dashed border-brutal-black/10 flex items-center justify-between">
                    <div className="flex gap-2">
                        {scholarship.daysRemaining !== undefined && (
                            <div className={cn(
                                "flex items-center gap-1 px-2 py-0.5 text-[10px] font-black border-2 border-brutal-black shadow-[2px_2px_0_0_#000]",
                                scholarship.daysRemaining < 10 ? "bg-brutal-orange text-white" : "bg-white text-brutal-black"
                            )}>
                                <Clock className="w-3 h-3" />
                                {scholarship.daysRemaining} {scholarship.daysRemaining === 1 ? 'day' : 'days'} to go
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground italic">
                        Last Updated: 2026-02-24
                    </span>
                </div>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-5 border-t-2 border-brutal-black">
                <Link
                    href={`/scholarships/${scholarship.slug}`}
                    className="col-span-4 py-3 bg-brutal-yellow hover:bg-brutal-yellow/90 font-black uppercase text-sm flex items-center justify-center gap-2 border-r-2 border-brutal-black transition-all"
                >
                    View Details <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                    href={scholarship.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 py-3 bg-white hover:bg-nb-bg flex items-center justify-center transition-all"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </Card>
    );
};

export default ScholarshipCard;
