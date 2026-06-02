import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { QueryProvider } from "@/providers/query-provider";
import { SyncUserProvider } from "@/components/providers/sync-user-provider";
import { BackendErrorScreen } from "@/components/backend-error-screen";
import { ProfileWarning } from "@/components/auth/profile-warning";

export const metadata: Metadata = {
  title: "YouTOP Academy — Learn, Prepare, Succeed",
  description:
    "High-quality suggestions, notes, and e-books for Madhyamik, HS, and Competitive Exams in West Bengal.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasValidKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_Y2xlcmsuYXV0aC5kZXYk";

  if (!hasValidKey) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen flex items-center justify-center bg-brutal-yellow p-4" suppressHydrationWarning>
          <div
            className="bg-card border-4 border-brutal-black rounded-2xl p-8 max-w-xl text-center space-y-6"
            style={{ boxShadow: "8px 8px 0px 0px var(--brutal-black)" }}
          >
            <h1 className="text-3xl font-black tracking-tight text-brutal-purple text-center">
              Awaiting Clerk Keys 🔑
            </h1>
            <p className="text-foreground font-medium text-lg text-center">
              Your YouTOP Academy app is ready, but it needs authentication keys to run!
            </p>
            <div className="bg-muted p-4 border-2 border-brutal-black rounded-lg text-left text-sm font-bold space-y-3">
              <p>1. Go to <a href="https://clerk.com" className="text-brutal-purple underline">clerk.com</a> and sign in / sign up.</p>
              <p>2. Create a new Application.</p>
              <p>3. Copy the <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code>CLERK_SECRET_KEY</code> from the dashboard.</p>
              <p>4. Open <code>.env.local</code> in your editor and paste them.</p>
              <p>5. The app will automatically reload and this screen will disappear!</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c6ff7", // brutal purple
          colorText: "#1a1a2e",
          colorBackground: "#ffffff",
          colorDanger: "#ef4444",
          colorInputText: "#1a1a2e",
          fontFamily: "inherit",
          borderRadius: "0.5rem",
        },
        elements: {
          formButtonPrimary: "bg-brutal-yellow hover:bg-brutal-yellow/90 text-brutal-dark border-3 border-brutal-black font-bold shadow-[4px_4px_0_0_#222222] hover:shadow-[6px_6px_0_0_#222222] hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-brutal-purple",
          formFieldInput: "border-3 border-brutal-black rounded-lg focus:ring-2 focus:ring-brutal-purple bg-background font-medium py-2.5",
          formFieldLabel: "text-sm font-bold text-foreground mb-1",
          socialButtonsBlockButton: "border-3 border-brutal-black bg-white font-bold hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0_0_#222222] hover:shadow-[5px_5px_0_0_#222222]",
        },
      }}
    >
      <QueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body className="min-h-screen flex flex-col selection:bg-nb-lime selection:text-black" suppressHydrationWarning>
            {/* Strict Backend Check: Blocks UI if connection fails */}
            <BackendErrorScreen />
            
            {/* Syncs the Clerk user to the NestJS backend and Zustand store */}
            <SyncUserProvider />
            <Navbar />
            
            {/* Global Warning for incomplete profiles */}
            <ProfileWarning />

            <main className="flex-1">{children}</main>
            <Footer />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
