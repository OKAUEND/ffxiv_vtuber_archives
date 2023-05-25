'use client';

import { Archives } from '@/app/archives/_components/Archives/route';
import { Suspense } from 'react';
export default async function Article({
  params,
}: {
  params: { channelID: string };
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Archives channelID={params.channelID} />
      </Suspense>
    </div>
  );
}
