import { atom, selector, useRecoilValue, useRecoilCallback } from 'recoil';

import { fetchExtend } from '@/_utile/fetch';
import { Channels } from '@/control/(types)';
import { HikasenVtuber } from '@/(types)';
import { channel } from 'diagnostics_channel';

type ControlChannel = HikasenVtuber & { isAllMatched: boolean };

const selectedChannel = atom<HikasenVtuber[]>({
  key: 'store/selected-channel',
  default: [],
});

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

const channelList = selector<ControlChannel[]>({
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

  const cacheChannel = useRecoilCallback(
    ({ set }) =>
      (channel: ControlChannel) => {
        const tmpChannel: HikasenVtuber = {
          channelID: channel.channelID,
          channelIconID: channel.channelIconID,
          channelName: channel.channelName,
          name: channel.name,
          twitter: channel.twitter,
          twitch: channel.twitch,
          ffxiv: channel.ffxiv,
        };
        set(selectedChannel, (prev) => [...prev, tmpChannel]);
      }
  );
  return [channels, cacheChannel] as const;
};
