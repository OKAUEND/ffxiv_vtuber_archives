'use client';
import { use, cache } from 'react';
import { Suspense } from 'react';
import Loading from './loading';
// import Error from './error';

const getAPI = cache(async (channelID: string) => {
  const res = await fetch(`/api/archives/${channelID}?mock=supermock`);
  const data = await res.json();
});

export default async function Article({
  params,
}: {
  params: { channelID: string };
}) {
  const { archives } = useArchives(params.channelID);
  return (
    <div>
      <h1>テスト</h1>
      <p>パスID: {params.channelID}</p>
    </div>
  );
}
