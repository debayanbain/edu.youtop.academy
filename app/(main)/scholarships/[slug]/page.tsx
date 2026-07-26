"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { fetchScholarship } from "@/lib/content-adapters";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, MapPin, ArrowLeft, CheckCircle2, Award, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const ScholarshipDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { userId, getToken } = useAuth();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";

    // Fetch the single scholarship from NestJS (Strapi-backed).
    const { data: scholarship, isPending, isError } = useQuery({
        queryKey: ["scholarship", slug, userId],
        queryFn: async () => {
            const token = await getToken();
            return fetchScholarship(slug, token ?? undefined);
        },
        enabled: !!slug,
    });

    if (isPending) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="h-10 w-48 border-2 border-brutal-black bg-muted/40 shadow-[4px_4px_0_0_#000] animate-pulse" />
                <div className="h-72 border-2 border-brutal-black bg-muted/40 shadow-[4px_4px_0_0_#000] animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-64 border-2 border-brutal-black bg-muted/40 shadow-[4px_4px_0_0_#000] animate-pulse" />
                    <div className="h-64 border-2 border-brutal-black bg-muted/40 shadow-[4px_4px_0_0_#000] animate-pulse" />
                </div>
            </div>
        );
    }

    if (isError || !scholarship) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Scholarship not found</h2>
                <button onClick={() => router.push("/scholarships")} className="btn-brutal">
                    Back to list
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => router.back()}
                className="btn-brutal btn-brutal-sm mb-8 flex items-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Scholarships
            </button>

            <div className="space-y-8">
                {/* Main Header Card */}
                <Card className="p-8 bg-white dark:bg-brutal-dark">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant={scholarship.category === "Indian" ? "yellow" : "blue"}>
                            {scholarship.category}
                        </Badge>
                        {scholarship.domain && (
                            <Badge variant="green">
                                {scholarship.domain}
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
                        {scholarship.title}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t font-bold">
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs uppercase">Provider</span>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-brutal-purple" />
                                {scholarship.provider}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs uppercase">Reward Amount</span>
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-brutal-green" />
                                {scholarship.amount}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs uppercase">Application Deadline</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-brutal-orange" />
                                {scholarship.deadline}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <a
                            href={scholarship.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-brutal w-full sm:w-auto"
                        >
                            Apply Now <ExternalLink className="ml-2 w-5 h-5" />
                        </a>
                    </div>
                </Card>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Description & Eligibility */}
                    <div className="space-y-8">
                        <Card className="h-full">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Award className="w-6 h-6 text-brutal-yellow" /> About Scholarship
                            </h2>
                            <p className="text-lg leading-relaxed">
                                {scholarship.description}
                            </p>
                        </Card>

                        <Card className="h-full">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-brutal-green" /> Eligibility Criteria
                            </h2>
                            <ul className="space-y-3">
                                {scholarship.eligibility.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-brutal-black shrink-0" />
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Benefits */}
                    <Card className="bg-nb-lime/10">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-brutal-purple" /> Key Benefits
                        </h2>
                        <div className="space-y-4">
                            {scholarship.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white border-2 border-brutal-black rounded-lg shadow-[4px_4px_0_0_#222]">
                                    <CheckCircle2 className="w-5 h-5 text-brutal-green shrink-0" />
                                    <span className="font-bold">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-brutal-yellow/20 border-2 border-dashed border-brutal-black rounded-xl">
                            <p className="font-bold text-sm">
                                Don&apos;t miss out! Make sure to read all the instructions on the official website before applying.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetailPage;

