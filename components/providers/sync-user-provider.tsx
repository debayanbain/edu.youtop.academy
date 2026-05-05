'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSyncUser } from '@/hooks/use-sync-user';
import { useUserStore } from '@/store';

/**
 * SyncUserProvider
 *
 * Rendered inside ClerkProvider. When a user is signed in, it:
 * 1. Calls POST /users/sync on the NestJS backend to upsert the user in DB
 * 2. Populates the Zustand user store with the response
 *
 * This replaces the old `syncUserToDB()` server action.
 */
export function SyncUserProvider() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { mutate: syncUser } = useSyncUser();
  const { setUser, setSynced, clearUser, setBackendError } = useUserStore();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      clearUser();
      return;
    }

    const primaryEmail = user.emailAddresses[0]?.emailAddress;

    // Don't sync until we have at least the email
    if (!primaryEmail) return;

    // Always sync on every sign-in — the backend smart-update only fills
    // in fields that are missing in the DB, so this is safe to run every time.
    syncUser(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: primaryEmail,
        imageUrl: user.imageUrl,
      },
      {
        onSuccess: (data) => {
          setUser({
            id: data.id,
            clerkId: data.clerkId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.emailId,
            imageUrl: data.imageUrl,
            role: data.role,
          });
          setSynced(true);
          setBackendError(false);
        },
        onError: (err) => {
          console.error('[SyncUserProvider] Failed to sync user:', err);
          setBackendError(true);
        },
      },
    );
  }, [isLoaded, isSignedIn, user, syncUser, setUser, setSynced, clearUser, setBackendError]);

  return null;
}
