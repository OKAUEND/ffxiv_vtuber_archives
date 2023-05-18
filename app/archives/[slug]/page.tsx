import { TestFe } from '@/src/features/TestFe';
import { Suspense } from 'react';
import Loading from './loading';
// import Error from './error';

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/25');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData();

  console.log({ data });

  return (
    <div>
      <h1>テスト</h1>
      <p>パスID: {params.slug}</p>
      {data.name}
    </div>
  );
}
