import { UserProfile } from "@clerk/nextjs";
import { LuUser } from "react-icons/lu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile — YouTOP Academy",
  description: "Manage your YouTOP Academy account settings.",
};

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div
        className="bg-card border-3 border-border rounded-xl p-6 flex items-center gap-4"
        style={{ boxShadow: "6px 6px 0px 0px var(--brutal-black)" }}
      >
        <div className="w-14 h-14 bg-brutal-purple rounded-xl border-2 border-border flex items-center justify-center shrink-0"
          style={{ boxShadow: "3px 3px 0px 0px var(--brutal-black)" }}>
          <LuUser className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">
            Manage your personal information and security preferences.
          </p>
        </div>
      </div>

      {/* Clerk UserProfile */}
      <div className="flex justify-center">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full max-w-4xl",
              cardBox: "border-3 border-border rounded-2xl shadow-[8px_8px_0_0_var(--brutal-black)] bg-white w-full overflow-hidden",
              card: "shadow-none border-none rounded-none w-full max-w-none bg-transparent",
              navbar: "border-r-3 border-border bg-card",
              scrollBox: "bg-white",
              headerTitle: "text-xl font-black tracking-tight",
              headerSubtitle: "text-sm font-medium text-muted-foreground",
              formButtonPrimary: "bg-brutal-purple hover:bg-brutal-purple/90 text-white border-2 border-brutal-black font-bold shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] transition-all",
              formFieldInput: "border-2 border-border rounded-lg focus:ring-2 focus:ring-brutal-purple bg-white font-medium py-2",
            }
          }}
        />
      </div>
    </div>
  );
}
