'use client';

import { ErrorBoundaryExtended } from '@/app/_components/ErrorBoundary';

export default function Error({ children }: { children: React.ReactNode }) {
  return <ErrorBoundaryExtended>{children}</ErrorBoundaryExtended>;
}
