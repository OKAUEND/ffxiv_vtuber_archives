'use client';

import { atom, selector, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';

const pokemonID = atom({
  key: 'state/pokemon-id',
  default: 1,
});

const PokemonQuery = selector({
  key: 'data-flow/pokemon',
  get: async ({ get }) => {
    const id = get(pokemonID);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    return data;
  },
});

export const TestFe = async () => {
  const router = useRouter();
  const data = useRecoilValue(PokemonQuery);

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
