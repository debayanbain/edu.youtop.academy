"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaXTwitter,
  FaLinkedinIn,
  FaDiscord,
  FaGithub,
} from "react-icons/fa6";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";

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

const SOCIAL_ICONS: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  telegram: FaTelegram,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
  github: FaGithub,
};

const Footer = () => {
  const { logo, siteName, socialLinks, footerColumns } = useGlobalSettings();
  const columns =
    footerColumns.length > 0
      ? footerColumns
      : Object.entries(FOOTER_LINKS).map(([title, links]) => ({
          title,
          links,
        }));

  return (
    <footer className="bg-brutal-dark text-white border-t-3 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {logo ? (
                <div className="relative w-10 h-10 rounded-lg border-2 border-white/20 overflow-hidden">
                  <Image
                    src={logo}
                    alt={siteName || "YouTOP"}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-brutal-yellow rounded-lg border-2 border-white/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-brutal-dark" />
                </div>
              )}
              {siteName ? (
                <span className="text-xl font-black tracking-tight">
                  {siteName}
                </span>
              ) : (
                <span className="text-xl font-black tracking-tight">
                  You<span className="text-brutal-purple">TOP</span>
                </span>
              )}
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The #1 learning platform for students in West Bengal. Quality
              education made accessible.
            </p>

            {/* Social links (from Strapi Global Settings) */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {socialLinks.map((s) => {
                  const Icon = SOCIAL_ICONS[s.platform.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <a
                      key={`${s.platform}-${s.url}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 hover:bg-brutal-yellow hover:text-brutal-dark hover:border-brutal-yellow transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-bold text-sm uppercase tracking-wider text-brutal-yellow mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
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
            © {new Date().getFullYear()} {siteName || "YouTOP Academy"}. All
            rights reserved.
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
