'use client';

import { selector, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';

const PokemonQuery = selector({
  key: 'data-flow/pokemon',
  get: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    const data = await response.json();

    return data;
  },
});

export const TestFe = () => {
  const router = useRouter();
  const pokemon = useRecoilValue(PokemonQuery);

  console.log({ pokemon });

  return (
    <div>
      <h2>テスト</h2>
      子コンポーネント
      <button
        onClick={() => {
          router.push('/');
        }}>
        Back To Top
      </button>
    </div>
  );
};
