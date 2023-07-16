import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

const sortOptions = [
  { key: 'Desc', name: '新しい順' },
  { key: 'Asc', name: '古い順' },
];

const beginLiveYears = [
  { key: '2018', name: '2018年' },
  { key: '2019', name: '2019年' },
  { key: '2020', name: '2020年' },
  { key: '2021', name: '2021年' },
  { key: '2022', name: '2022年' },
  { key: '2023', name: '2023年' },
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
  return [option, sortOptions, changeOption] as const;
};

const beginLiveYear = atom({
  key: 'state/year',
  default: beginLiveYears[0],
});

export const useChannelSearchBeginYear = () => {
  const year = useRecoilValue(beginLiveYear);

  const changeYear = useRecoilCallback(({ set }) => (year) => {
    set(beginLiveYear, year);
  });
  return [year, beginLiveYears, changeYear] as const;
};
