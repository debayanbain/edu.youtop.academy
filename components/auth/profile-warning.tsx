'use client';

import { useUserStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { LuInfo, LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ProfileWarning() {
  const { firstName, lastName, isSynced, clerkId } = useUserStore();

  // Only show if user is signed in (clerkId exists), 
  // sync has completed (isSynced is true), 
  // and either firstName or lastName is missing.
  const isProfileIncomplete = isSynced && clerkId && (!firstName || !lastName);

  return (
    <AnimatePresence>
      {isProfileIncomplete && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="overflow-hidden bg-brutal-orange/10 border-b-3 border-brutal-black"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brutal-orange rounded-lg border-2 border-brutal-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#000]">
                  <LuInfo className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-black text-sm text-brutal-dark">
                    Your profile is incomplete!
                  </p>
                  <p className="text-xs font-bold text-brutal-dark/70">
                    Please add your first and last name to get full access to all features.
                  </p>
                </div>
              </div>
              <Link href="/profile">
                <Button 
                  size="sm" 
                  variant="orange" 
                  className="group shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000]"
                >
                  Complete Profile
                  <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
