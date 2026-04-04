"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface RazorpayOptions {
  amount: number;
  productType: "ebook" | "note";
  productId: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: unknown) => {
      open: () => void;
      on: (event: string, callback: (response: { error: unknown }) => void) => void;
    };
  }
}

export const useRazorpay = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openCheckout = async ({ amount, productType, productId, onSuccess, onError }: RazorpayOptions) => {
    if (!userId) {
      router.push("/sign-up");
      return;
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 1. Create Order on Server
    const response = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, productType, productId }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error("Order Creation Failed:", orderData.error);
      onError?.(orderData.error);
      return;
    }

    // 2. Initialize Checkout Modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: orderData.amount, 
      currency: orderData.currency,
      name: "YouTOP Academy",
      description: `Purchase of ${productType}: ${productId}`,
      image: "https://your-logo-url.com/logo.png",
      order_id: orderData.id, 
      handler: async function (response: RazorpayResponse) {
        // 3. Verify Payment Signature on Server
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyRes.ok && verifyData.success) {
          onSuccess?.();
          alert("Payment Successful!");
        } else {
          onError?.(verifyData.message || "Verification Failed");
        }
      },
      prefill: {
        name: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        contact: user?.primaryPhoneNumber?.phoneNumber || "",
      },
      notes: {
        address: "YouTOP Academy",
      },
      theme: {
        color: "#7c6ff7", // Brutal Purple
      },
    };

    const Razorpay = window.Razorpay;
    const paymentObject = new Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: { error: unknown }) {
      onError?.(response.error);
    });
  };

  return { openCheckout };
};
