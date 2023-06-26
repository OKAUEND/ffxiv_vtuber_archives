import { selector, useRecoilValue } from 'recoil';

import { fetchExtend } from '@/_utile/fetch';
import { Channels } from '@/control/(types)';
import { HikasenVtuber } from '@/(types)';

type ControlChannel = HikasenVtuber & { isAllMatched: boolean };

const channelQuery = selector({
  key: 'data-flow/channels-query',
  get: async () => {
    const data = await fetchExtend<Channels>({
      url: '/api/control/',
      store: false,
    });
    return data;
  },
});

const channelList = selector({
  key: 'data-flow/channels-list',
  get: async ({ get }) => {
    const data = get(channelQuery);
    const channels = data.gas.map((channel, index) => {
      if (data.db.length === 0) return { ...channel, isAllMatched: false };

      const keys = Object.keys(channel);
      const target = data.db[index];
      let isMatched = true;
      keys.forEach((key) => {
        if (channel[key] !== target[key]) {
          isMatched = false;
        }
      });
      if (isMatched) {
        return { ...channel, isAllMatched: true };
      } else {
        return { ...channel, isAllMatched: false };
      }
    });
    return channels;
  },
});

export const useAdminControl = () => {
  const channels = useRecoilValue(channelList);
  return channels;
};
