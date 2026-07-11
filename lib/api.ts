/**
 * API client for calling the YouTOP NestJS backend.
 * Pass the Clerk session token (from useAuth().getToken()) to each call.
 */

import { Order } from './types';

// Backend serves everything under the /api/v1 prefix (global prefix + URI versioning).
const API_BASE_URL = `${
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
}/api/v1`;

// Every success response is wrapped by the backend in { success, data, ... }.
// Return the inner payload so callers get the array/object they expect.
function unwrap<T>(json: unknown): T {
  if (json && typeof json === 'object' && 'data' in json) {
    return (json as { data: T }).data;
  }
  return json as T;
}

export const apiClient = {
  async get<T>(path: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(
        (error as { message?: string }).message ?? 'Request failed',
      );
    }

    return unwrap<T>(await res.json());
  },

  async post<T>(path: string, body: unknown, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(
        (error as { message?: string }).message ?? 'Request failed',
      );
    }

    return unwrap<T>(await res.json());
  },

  async getPurchases(token: string) {
    return this.post<Order[]>('/razorpay/my-purchases', {}, token);
  },
};
