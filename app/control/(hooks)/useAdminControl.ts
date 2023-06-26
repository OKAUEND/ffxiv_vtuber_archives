import { atom, selector, useRecoilValue, useRecoilCallback } from 'recoil';

import { fetchExtend } from '@/_utile/fetch';
import { Channels } from '@/control/(types)';
import { HikasenVtuber } from '@/(types)';
import { useCallback } from 'react';

type ControlChannel = HikasenVtuber & { isAllMatched: boolean };

const updateChannel = async (channels: HikasenVtuber[]) => {
  const res = await fetchExtend({
    method: 'POST',
    url: '/api/control/',
    store: false,
    body: channels,
  });
};

const selectedChannel = atom<Map<string, HikasenVtuber>>({
  key: 'store/selected-channel',
  default: new Map([]),
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

export const channelMapToArray = selector<HikasenVtuber[]>({
  key: 'convert/selected-channel',
  get: ({ get }) => {
    const mapChannels = get(selectedChannel);
    console.log(mapChannels);
    return [...mapChannels.values()];
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
  const selectedChannels = useRecoilValue(channelMapToArray);

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
        set(selectedChannel, (prev) => {
          //元のに変更を加えたくないので、クローンを作る
          const clone = new Map(prev);
          //新しいMapをセットし、値を更新する
          clone.set(channel.channelID, tmpChannel);
          //setter関数へ返す
          return clone;
        });
      }
  );

  const updateDataBase = useCallback(() => {
    updateChannel(selectedChannels);
  }, [selectedChannels]);

  return [channels, selectedChannels, cacheChannel, updateDataBase] as const;
};
