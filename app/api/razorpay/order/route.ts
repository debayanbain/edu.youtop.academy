import { auth } from "@clerk/nextjs/server";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { amount, productType, productId } = await req.json();

    if (!amount || !productType || !productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${shortid.generate()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save the pending order to our database
    await db.insert(orders).values({
      userId,
      orderId: order.id,
      amount: amount,
      currency: "INR",
      status: "pending",
      productType,
      productId,
    });

    return NextResponse.json(order);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Razorpay Order Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
