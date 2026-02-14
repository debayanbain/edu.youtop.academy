import React from "react";
import { Button } from "../ui/button";

const CtaSection = () => {
  return (
    <section className="bg-brutal-dark text-white py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6">
          Start your journey today.
        </h2>
        <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-10">
          Join 50,000+ students across West Bengal using YouTOP Academy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg">Get Started Free</Button>
          <Button variant="white" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
