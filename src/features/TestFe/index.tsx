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

export const TestFe = async () => {
  const router = useRouter();
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
  const data = await response.json();

  return (
    <div>
      <h2>TEST {data.name}</h2>
      子コンポーネント
      <button
        onClick={() => {
          router.push('/');
        }}
      >
        Back To Top by {data.name}
      </button>
    </div>
  );
};
