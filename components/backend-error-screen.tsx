'use client';

import { useUserStore } from '@/store';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export function BackendErrorScreen() {
  const { backendError } = useUserStore();

  if (!backendError) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <div className="max-w-md w-full p-8 rounded-3xl border border-white/10 bg-white/5 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">System Offline</h1>
          <p className="text-gray-400 leading-relaxed">
            We are unable to establish a secure connection to our core services. 
            The application has been suspended for your protection.
          </p>
        </div>

        <div className="pt-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 px-6 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Retry Connection
          </button>
        </div>

        <p className="text-xs text-gray-600 uppercase tracking-widest pt-4">
          Error Code: SECURE_BACKEND_REFUSED
        </p>
      </div>
    </div>
  );
}
