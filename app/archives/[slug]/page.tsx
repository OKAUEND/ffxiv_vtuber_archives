import { TestFe } from '@/src/features/TestFe';
import { Suspense } from 'react';
import Loading from './loading';

export default function Article({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>テスト</h1>
      <p>パスID: {params.slug}</p>
      <Suspense fallback={<Loading />}>
        <TestFe />
      </Suspense>
    </div>
  );
}

export * from '@/src/features/TestFe';
