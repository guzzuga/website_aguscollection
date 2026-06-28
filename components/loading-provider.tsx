'use client';

import { useState, useEffect, ReactNode } from 'react';
import { LoadingScreen } from '@/components/loading-screen';

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-navy">
        <LoadingScreen onFinish={handleLoadingFinish} />
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      <div className={isLoading ? 'overflow-hidden' : ''}>{children}</div>
    </>
  );
}