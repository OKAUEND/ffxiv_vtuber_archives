'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Provider } from '@supabase/supabase-js';

interface IProps {
  provider: Provider;
  children: React.ReactNode;
  param?: string;
}

export const SignIn = ({ provider, children, param = '' }: IProps) => {
  const supabase = createClientComponentClient();

  const onSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback${param}`,
      },
    });
  };

  return <button onClick={() => onSignIn()}>{children}</button>;
};
