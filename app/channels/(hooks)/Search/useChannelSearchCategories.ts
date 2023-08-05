import { ChannelSearchParams } from '@/channels/(types)';
import { Tags } from '@/(types)';

import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

type Categories = { key: string; name: string };

const sortOptions = [
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
  return [option, sortOptions, changeOption] as const;
};

const beginLiveYears = [
  { key: '2018', name: '2018年' },
  { key: '2019', name: '2019年' },
  { key: '2020', name: '2020年' },
  { key: '2021', name: '2021年' },
  { key: '2022', name: '2022年' },
  { key: '2023', name: '2023年' },
];

const beginLiveYear = atom<Categories>({
  key: 'state/year',
  default: beginLiveYears[0],
});

export const useChannelSearchBeginYear = () => {
  const year = useRecoilValue(beginLiveYear);

  const changeYear = useRecoilCallback(({ set }) => (year: Categories) => {
    set(beginLiveYear, year);
  });

  return [year, beginLiveYears, changeYear] as const;
};

type Param = [string, string];

export const useInitChannelSearch = () => {
  const initOrder = useRecoilCallback(({ set }) => (init: Categories) => {
    set(sortOption, init);
  });
  const initYear = useRecoilCallback(({ set }) => (init: Categories) => {
    set(beginLiveYear, init);
  });

  const initCategories = (params: ChannelSearchParams) => {
    if (!params) return;
    const keys: Param[] = Object.entries(params);

    const findTarget = (dates: Array<Categories>, param: Param) => {
      return dates.find((value) => value.key === param[1]);
    };

    keys.forEach((param) => {
      switch (param[0]) {
        case 'orderBy': {
          const target = findTarget(sortOptions, param);
          initOrder(target);
          break;
        }
        case 'year': {
          const target = findTarget(beginLiveYears, param);
          initYear(target);
          break;
        }
        default: {
          break;
        }
      }
    });
  };

  return [initCategories] as const;
};

const tags: Tags = {
  content: [
    {
      id: 1,
      name: 'ストーリー',
      code: 'story',
      type: 'content',
    },
    {
      id: 2,
      name: '極・幻',
      code: 'primal',
      type: 'content',
    },
    {
      id: 3,
      name: '高難易度',
      code: 'raid',
      type: 'content',
    },
    {
      id: 4,
      name: 'ハウジング',
      code: 'housing',
      type: 'content',
    },
    {
      id: 5,
      name: '世界設定',
      code: 'lore',
      type: 'content',
    },
    {
      id: 6,
      name: '地図',
      code: 'treasure',
      type: 'content',
    },
    {
      id: 7,
      name: 'SS',
      code: 'treasure',
      type: 'content',
    },
    {
      id: 8,
      name: 'ギャザクラ',
      code: 'disciples',
      type: 'content',
    },
    {
      id: 9,
      name: 'ユーザーイベント',
      code: 'event',
      type: 'content',
    },
    {
      id: 10,
      name: 'エウレカ・ボズヤ系',
      code: 'filed',
      type: 'content',
    },
    {
      id: 11,
      name: 'PvP',
      code: 'pvp',
      type: 'content',
    },
    {
      id: 12,
      name: 'ダンジョン',
      code: 'dungeon',
      type: 'content',
    },
  ],
  party: [
    {
      id: 1,
      name: '参加型',
      code: 'party',
      type: 'play',
    },
    {
      id: 2,
      name: 'ソロ',
      code: 'solo',
      type: 'play',
    },
    {
      id: 3,
      name: 'npc芸歓迎',
      code: 'npcplay',
      type: 'play',
    },
    {
      id: 4,
      name: 'ハウジング',
      code: 'housing',
      type: 'content',
    },
    {
      id: 5,
      name: '攻略',
      code: 'raiders',
      type: 'play',
    },
    {
      id: 6,
      name: '周回',
      code: 'fram',
      type: 'play',
    },
  ],
  timezone: [
    {
      id: 1,
      name: '早朝',
      code: 'earylmorning',
      type: 'timezone',
    },
    {
      id: 2,
      name: '朝',
      code: 'morning',
      type: 'timezone',
    },
    {
      id: 3,
      name: '昼',
      code: 'midday',
      type: 'timezone',
    },
    {
      id: 4,
      name: '夕方',
      code: 'evening',
      type: 'timezone',
    },
    {
      id: 5,
      name: '夜',
      code: 'night',
      type: 'timezone',
    },
    {
      id: 6,
      name: '深夜',
      code: 'midnight',
      type: 'timezone',
    },
  ],
};

export const useTags = () => {
  return tags;
};
