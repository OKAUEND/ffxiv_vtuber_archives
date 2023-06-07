'use client';

import { ErrorBoundaryFallBack } from '@/_components/ErrorBoundary';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <ErrorBoundaryFallBack message={error.message}></ErrorBoundaryFallBack>
    </>
  );
}
