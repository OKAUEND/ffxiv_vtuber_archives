import { TestFe } from '@/src/features/TestFe';
import { Suspense } from 'react';

export default function Article({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>テスト</h1>
      <p>パスID: {params.slug}</p>
      <TestFe />
    </div>
  );
}

export * from '@/src/features/TestFe';
