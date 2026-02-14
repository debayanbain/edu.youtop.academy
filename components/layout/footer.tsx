import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const FOOTER_LINKS = {
  Exams: [
    { label: "Madhyamik", href: "/madhyamik" },
    { label: "HS", href: "/hs" },
    { label: "Suggestions", href: "/madhyamik-suggestion" },
  ],
  Resources: [
    { label: "E-Books", href: "/ebooks" },
    { label: "Results", href: "/results" },
    { label: "News", href: "/news" },
  ],
  Scholarships: [
    { label: "SVMCM", href: "/scholarships/svmcm" },
    { label: "OASIS", href: "/scholarships/oasis" },
    { label: "Nabanna", href: "/scholarships/nabanna" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-brutal-dark text-white border-t-3 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brutal-yellow rounded-lg border-2 border-white/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-brutal-dark" />
              </div>
              <span className="text-xl font-black tracking-tight">
                You<span className="text-brutal-purple">TOP</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The #1 learning platform for students in West Bengal. Quality
              education made accessible.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-sm uppercase tracking-wider text-brutal-yellow mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} YouTOP Academy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              About
            </Link>
            <span className="text-gray-700">·</span>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <span className="text-gray-700">·</span>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
