import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { apiClient } from '@/lib/api';

interface SyncUserPayload {
  firstName?: string | null;
  lastName?: string | null;
  emailId: string;
  imageUrl?: string | null;
}

export interface SyncUserResponse {
  id: number;
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  emailId: string;
  imageUrl: string | null;
  role: 'user' | 'admin';
}

export function useSyncUser() {
  const { getToken } = useAuth();

  return useMutation<SyncUserResponse, Error, SyncUserPayload>({
    mutationFn: async (payload) => {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      return apiClient.post<SyncUserResponse>('/users/sync', payload, token);
    },
  });
}

export function useGetMe() {
  const { getToken, isSignedIn } = useAuth();

  return useQuery<SyncUserResponse>({
    queryKey: ['user', 'me'],
    enabled: !!isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      return apiClient.get<SyncUserResponse>('/users/me', token);
    },
  });
}

