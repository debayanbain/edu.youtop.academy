"use client";

import React, { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { notesStore } from "@/lib/data/notes";
import Link from "next/link";
import {
  LuArrowLeft,
  LuCheck,
  LuBookOpen,
  LuGraduationCap,
  LuFileText,
} from "react-icons/lu";
import Image from "next/image";
import { useRazorpay } from "@/hooks/useRazorpay";

interface PageProps {
  params: Promise<{ id: string }>;
}

const NoteDetailsPage = ({ params }: PageProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const { openCheckout } = useRazorpay();
  const param = use(params);
  const note = notesStore.find((n) => n.id === param.id);

  if (!note) {
    notFound();
  }

  const handleCheckout = () => {
    if (!userId) {
      router.push("/sign-up");
      return;
    }

    openCheckout({
      amount: note.price,
      productType: "note",
      productId: note.id,
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 mb-6 md:mb-8 px-3 py-1.5 md:px-4 md:py-2 border-2 border-border rounded-md bg-card font-bold shadow-[2px_2px_0_0_#000] hover:bg-brutal-yellow/20 transition-colors text-sm md:text-base"
        >
          <LuArrowLeft className="w-4 h-4" />
          স্টোরে ফিরে যান (Back)
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Image */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="card-brutal overflow-hidden border-3 md:border-4">
              <div className="aspect-4/3 bg-muted relative">
                <Image
                  src={note.coverImage}
                  alt={note.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="card-brutal p-3 md:p-4 flex flex-col items-center text-center gap-1 md:gap-2">
                <LuGraduationCap className="w-5 h-5 md:w-6 md:h-6 text-brutal-purple" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground leading-none">
                  ক্লাস (Class)
                </span>
                <span className="font-black text-sm md:text-base leading-none">{note.class}</span>
              </div>
              <div className="card-brutal p-3 md:p-4 flex flex-col items-center text-center gap-1 md:gap-2">
                <LuBookOpen className="w-5 h-5 md:w-6 md:h-6 text-brutal-green" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground leading-none">
                  বিষয় (Subject)
                </span>
                <span className="font-black text-sm md:text-base leading-none">{note.subject}</span>
              </div>
              <div className="card-brutal p-3 md:p-4 flex flex-col items-center text-center gap-1 md:gap-2">
                <LuFileText className="w-5 h-5 md:w-6 md:h-6 text-brutal-orange" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground leading-none">
                  পৃষ্ঠা (Pages)
                </span>
                <span className="font-black text-sm md:text-base leading-none">{note.pages}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Checkout */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="flex gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <span className="text-brutal-purple">লেখক: {note.author}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-brutal-green">স্টক আছে (In Stock)</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase">
                {note.title}
              </h1>

              <p className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed">
                {note.description}
              </p>
            </div>

            {/* Pricing Card */}
            <div className="card-brutal p-5 md:p-6 bg-brutal-yellow/10 space-y-6">
              <div className="flex items-end gap-3 md:gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    বিশেষ মূল্য (Special Price)
                  </span>
                  <div className="flex items-baseline gap-2 md:gap-3">
                    <span className="text-4xl md:text-5xl font-black text-brutal-purple">
                      ₹{note.price}
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-muted-foreground line-through decoration-destructive decoration-2 md:decoration-4">
                      ₹{note.originalPrice}
                    </span>
                  </div>
                </div>
                <div className="badge-brutal bg-brutal-green text-white mb-1.5 md:mb-2 text-xs">
                  {Math.round(
                    ((note.originalPrice - note.price) / note.originalPrice) *
                    100,
                  )}
                  % OFF
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleCheckout}
                  className="btn-brutal btn-brutal-purple btn-brutal-lg w-full text-base md:text-lg shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000]"
                >
                  এখনই কিনুন — Checkout
                </button>
                <p className="text-center text-[10px] md:text-xs font-bold text-muted-foreground mt-1 md:mt-2">
                  নিরাপদ পেমেন্ট। সরাসরি আপনার ইমেইলে পিডিএফ পৌঁছে যাবে।
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-6 md:pt-8 border-t-2 border-border border-dashed">
              <h3 className="text-lg md:text-xl font-black uppercase">
                কী কী থাকছে (What&apos;s Included)
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {note.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brutal-green text-white flex items-center justify-center shrink-0 border-2 border-border shadow-[1px_1px_0_0_#000]">
                      <LuCheck className="w-3 h-3" />
                    </div>
                    <span className="font-semibold text-base md:text-lg leading-tight md:leading-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
