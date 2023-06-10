import { Channel } from '@/channels/_components/route';

export default async function Article() {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Channel />
    </>
  );
}
