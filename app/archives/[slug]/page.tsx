import { TestFe } from '@/src/features/TestFe';
import { Suspense } from 'react';
import Loading from './loading';
import Error from './error';

export default function Article({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>テスト</h1>
      <p>パスID: {params.slug}</p>
      <Error>
        <Suspense fallback={<Loading />}>
          <TestFe />
        </Suspense>
      </Error>
    </div>
  );
}

export * from '@/src/features/TestFe';
