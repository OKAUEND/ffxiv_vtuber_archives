import dynamic from 'next/dynamic';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

const DynamicControlClientComponent = dynamic(
  () => import('@/control/_components/channelControl'),
  { ssr: false }
);

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();

  return (
    <div>
      {data.user ? (
        <DynamicControlClientComponent />
      ) : (
        <>
          <div>
            ログイン認証が必要なページです。ログイン認証を行ってください
          </div>
          <Link href={`/control/auth`}>認証ページへ</Link>
        </>
      )}
    </div>
  );
}
