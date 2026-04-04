"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function syncUserToDB() {
  const user = await currentUser();
  if (!user) return null;

  const primaryEmail = user.emailAddresses[0]?.emailAddress ?? "";
  if (!primaryEmail) return null;

  try {
    await db
      .insert(users)
      .values({
        clerkId: user.id,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        emailId: primaryEmail,
        imageUrl: user.imageUrl ?? null,
        role: "user",
      })
      // If this Clerk user already exists, update their profile info
      .onConflictDoUpdate({
        target: users.clerkId,
        set: {
          firstName: user.firstName ?? null,
          lastName: user.lastName ?? null,
          emailId: primaryEmail,
          imageUrl: user.imageUrl ?? null,
          updatedAt: new Date(),
        },
      });

    console.log(`[syncUserToDB] Upserted user: ${user.id} (${primaryEmail})`);
    return user;
  } catch (err) {
    console.error("[syncUserToDB] Failed:", err);
    return null;
  }
}
