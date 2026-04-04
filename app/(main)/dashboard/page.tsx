import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LuBookOpen, LuFileText, LuTrophy, LuGraduationCap, LuUser } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Dashboard — YouTOP Academy",
  description: "Your personal learning dashboard on YouTOP Academy.",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const stats = [
    { label: "E-Books Saved", value: "0", icon: LuBookOpen, color: "bg-brutal-yellow" },
    { label: "Notes Accessed", value: "0", icon: LuFileText, color: "bg-brutal-purple" },
    { label: "Results Viewed", value: "0", icon: LuTrophy, color: "bg-brutal-green" },
    { label: "Scholarships Tracked", value: "0", icon: LuGraduationCap, color: "bg-brutal-orange" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Header */}
      <div
        className="bg-card border-3 border-border rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ boxShadow: "6px 6px 0px 0px var(--brutal-black)" }}
      >
        <div className="w-14 h-14 bg-brutal-yellow rounded-xl border-2 border-border flex items-center justify-center shrink-0"
          style={{ boxShadow: "3px 3px 0px 0px var(--brutal-black)" }}>
          <LuUser size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Welcome back,{" "}
            <span className="text-brutal-purple">
              {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "Student"}
            </span>
            ! 👋
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">
            {user?.emailAddresses?.[0]?.emailAddress}
          </p>
        </div>
        <div className="sm:ml-auto">
          <span className="inline-flex items-center px-3 py-1 text-xs font-black uppercase tracking-wider bg-brutal-green text-white border-2 border-border rounded-md"
            style={{ boxShadow: "2px 2px 0px 0px var(--brutal-black)" }}>
            Free Plan
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-black uppercase tracking-wide mb-4">Your Activity</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-card border-3 border-border rounded-xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform"
                style={{ boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
              >
                <div className={`w-10 h-10 ${stat.color} rounded-lg border-2 border-border flex items-center justify-center`}
                  style={{ boxShadow: "2px 2px 0px 0px var(--brutal-black)" }}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-black uppercase tracking-wide mb-4">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Browse E-Books", href: "/ebooks", desc: "Textbooks & study guides", color: "bg-brutal-yellow", icon: LuBookOpen },
            { label: "View Notes", href: "/notes", desc: "Chapter notes & summaries", color: "bg-brutal-purple", icon: LuFileText },
            { label: "Scholarships", href: "/scholarships", desc: "SVMCM, OASIS & more", color: "bg-brutal-green", icon: LuGraduationCap },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-card border-3 border-border rounded-xl p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform group"
                style={{ boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
              >
                <div className={`w-11 h-11 ${item.color} rounded-lg border-2 border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: "2px 2px 0px 0px var(--brutal-black)" }}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-black text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
