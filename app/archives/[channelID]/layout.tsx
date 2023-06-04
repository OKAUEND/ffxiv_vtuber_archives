'use client';

import { Suspense } from 'react';
import Loading from './loading';

export default function PageChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>{children}</section>
    </Suspense>
  );
}
