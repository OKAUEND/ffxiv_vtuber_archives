import { cookies, headers } from 'next/headers';

import { Channel } from '@/app/channels/_components/route';
import { Suspense } from 'react';
// import Error from './error';
export default async function Article({
  params,
}: {
  params: { pages: string };
}) {
  console.log(params.pages);
  return (
    <div>
      TEST?
      <Suspense fallback={<div> Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <Channel />
      </Suspense>
    </div>
  );
}
