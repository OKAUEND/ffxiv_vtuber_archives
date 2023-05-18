import { TestFe } from '@/src/features/TestFe';
import { Suspense } from 'react';
import Loading from './loading';
// import Error from './error';
export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <TestFe></TestFe>
      </Suspense>
    </div>
  );
}
