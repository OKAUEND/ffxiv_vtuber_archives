import dynamic from 'next/dynamic';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import ControlSignIn from '@/control/_components/controlSignIn';

const DynamicControlClientComponent = dynamic(
  () => import('@/control/_components/channelControl'),
  { ssr: false }
);

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <div>
        {/* ログインされていない場合は、ログイン画面への遷移を促す */}
        {user ? (
          <DynamicControlClientComponent isAdmin={isAdmin} />
        ) : (
          <>
            <div>
              ログイン認証が必要なページです。ログイン認証を行ってください
            </div>
            <ControlSignIn />
          </>
        )}
      </div>
    </div>
  );
}
