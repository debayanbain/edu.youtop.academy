import React from "react";
import { BookOpen, GraduationCap, Trophy, FileText } from "lucide-react";

const features = [
  { icon: BookOpen, label: "E-Books" },
  { icon: GraduationCap, label: "Scholarships" },
  { icon: Trophy, label: "Results" },
  { icon: FileText, label: "Mock Tests" },
];

const FeaturesGrid = () => {
  return (
    <section className="bg-brutal-yellow/20 py-10 sm:py-16 border-y-3 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="card-brutal bg-card p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer"
            >
              <item.icon size={32} className="sm:size-10" strokeWidth={1.5} />
              <span className="font-bold text-sm sm:text-lg text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
