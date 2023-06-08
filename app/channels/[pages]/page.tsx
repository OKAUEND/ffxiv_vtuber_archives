import { cookies, headers } from 'next/headers';

import { Channel } from '@/channels/_components/route';
import { LoadingBasicAnimation } from '@/_components/Loading';
import { Suspense } from 'react';
// import Error from './error';
export default async function Article({
  params,
}: {
  params: { pages: string };
}) {
  return (
    <div>
      <Suspense fallback={<LoadingBasicAnimation />}>
        {/* @ts-expect-error Async Server Component */}
        <Channel />
      </Suspense>
    </div>
  );
}
