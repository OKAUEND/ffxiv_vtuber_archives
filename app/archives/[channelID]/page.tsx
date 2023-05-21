import { Suspense } from 'react';
import Loading from './loading';
// import Error from './error';

export default async function Article({
  params,
}: {
  params: { channelID: string };
}) {
  return (
    <div>
      <h1>テスト</h1>
      <p>パスID: {params.channelID}</p>
    </div>
  );
}
