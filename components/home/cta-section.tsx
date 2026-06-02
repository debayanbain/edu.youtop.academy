import React from "react";
import { ArrowRight } from "lucide-react";
import { CtaBannerSectionDto } from "@/lib/homepage-types";

interface CtaSectionProps {
  data?: CtaBannerSectionDto;
}

const CtaSection = ({ data }: CtaSectionProps) => {
  return (
    <section className="bg-brutal-dark text-white py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              {data?.heading || "Ready to crush your goals?"}
            </h2>
            <p className="text-lg md:text-xl font-medium mb-8 opacity-90 max-w-xl mx-auto">
              {data?.subheading || "Join thousands of successful students and start your journey today with YouTOP Academy."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={data?.primary_button_link || "#"} className="w-full sm:w-auto flex">
                <button className="w-full bg-white text-brutal-purple px-8 py-4 font-black text-lg border-4 border-brutal-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--brutal-black)] active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-2 rounded-xl">
                  {data?.primary_button_text || "Get Started Free"} <ArrowRight size={20} strokeWidth={3} />
                </button>
              </a>
              <a href={data?.secondary_button_link || "#"} className="w-full sm:w-auto flex">
                <button className="w-full bg-transparent border-4 border-white px-8 py-4 font-black text-lg hover:bg-white hover:text-brutal-purple hover:border-brutal-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--brutal-black)] active:translate-y-0 active:shadow-none transition-all rounded-xl">
                  {data?.secondary_button_text || "Browse Courses"}
                </button>
              </a>
            </div>
      </div>
    </section>
  );
};

export default CtaSection;
