import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { AuthLoader } from "@/components/auth/auth-loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — YouTOP Academy",
  description: "Sign in to your YouTOP Academy account to access e-books, notes, and more.",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight">
          Welcome <span className="text-brutal-purple">Back</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground font-medium">
          Sign in to continue learning
        </p>
      </div>

      {/* Clerk embedded sign-in with stable wrapper */}
      <div className="min-h-150 flex items-center justify-center w-full">
        <ClerkLoading>
          <AuthLoader />
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#7c6ff7",
                fontFamily: "inherit",
              },
              elements: {
                formButtonPrimary:
                  "btn-brutal btn-brutal-purple !w-full !rounded-xl !border-3 !shadow-[4px_4px_0_0_#222222] hover:!bg-brutal-purple hover:!text-white hover:!translate-x-[-2px] hover:!translate-y-[-2px] hover:!shadow-[6px_6px_0_0_#222222] active:!translate-x-[2px] active:!translate-y-[2px] active:!shadow-[1px_1px_0_0_#222222] transition-all",
                socialButtonsBlockButton:
                  "btn-brutal btn-brutal-outline !w-full !rounded-xl !border-3 !shadow-[4px_4px_0_0_#222222] hover:!bg-brutal-purple hover:!text-white hover:!translate-x-[-2px] hover:!translate-y-[-2px] hover:!shadow-[6px_6px_0_0_#222222] active:!translate-x-[2px] active:!translate-y-[2px] active:!shadow-[1px_1px_0_0_#222222] !bg-white transition-all",
                formFieldInput:
                  "!flex !h-10 !w-full !rounded-md !border-2 !border-brutal-black !bg-white !px-3 !py-2 !text-sm !text-brutal-dark !font-medium !shadow-[3px_3px_0_0_#222222] focus:!shadow-[4px_4px_0_0_#222222] focus:!ring-2 focus:!ring-brutal-purple focus:!outline-none transition-all",
                formFieldLabel: "!text-sm !font-bold !text-brutal-dark",
                card: "!shadow-none !border-0 bg-transparent",
                cardBox: "!border-3 !border-brutal-black !shadow-[5px_5px_0_0_#222222] !rounded-xl"
              },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
}
