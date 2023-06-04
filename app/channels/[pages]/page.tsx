import { cookies, headers } from 'next/headers';

import { Channel } from '@/channels/_components/route';
import { Suspense } from 'react';
// import Error from './error';
export default async function Article({
  params,
}: {
  params: { pages: string };
}) {
  return (
    <div>
      <Suspense fallback={<div> Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <Channel />
      </Suspense>
    </div>
  );
}
