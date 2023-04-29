'use client';

import { selector, useRecoilValue } from 'recoil';

const PokemonQuery = selector({
  key: 'data-flow/pokemon',
  get: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    const data = await response.json();

    return data;
  },
});

export const TestFe = () => {
  const pokemon = useRecoilValue(PokemonQuery);

  console.log({ pokemon });

  return (
    <div>
      <h2>テスト</h2>
      子コンポーネント
    </div>
  );
};
