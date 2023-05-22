'use client';

import { ErrorBoundaryExtended } from '@/src/component/Error/index';

export default function Error({ children }: { children: React.ReactNode }) {
  return <ErrorBoundaryExtended>{children}</ErrorBoundaryExtended>;
}
