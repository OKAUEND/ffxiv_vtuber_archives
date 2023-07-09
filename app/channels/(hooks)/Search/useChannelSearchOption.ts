import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

export const sortOptions = [
  { key: 'Desc', name: '新しい順' },
  { key: 'Asc', name: '古い順' },
];

const sortOption = atom({
  key: 'state/sort-option',
  default: sortOptions[0],
});

export const useChannelSearchOption = () => {
  const option = useRecoilValue(sortOption);

  const changeOption = useRecoilCallback(({ set }) => (option) => {
    set(sortOption, option);
  });
  return [option, changeOption] as const;
};
