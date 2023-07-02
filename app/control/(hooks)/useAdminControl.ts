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
    return [...mapChannels.values()];
  },
});

const channelList = selector<ControlChannel[]>({
  key: 'data-flow/channels-list',
  get: async ({ get }) => {
    const data = get(channelQuery);
    const channels = data.gas.map((channel) => {
      //ここで、chennelと同じIDを持つのをdata.dbから取り出し、対象が存在するかを判定する
      const target = data.db.filter((db_channel) => {
        return db_channel.channelID === channel.channelID;
      })[0];

      if (data.db.length === 0 || target === undefined)
        return { ...channel, isAllMatched: false };

      const keys = Object.keys(channel);

      //マッチしているかの判定用変数
      let isMatched = true;
      keys.forEach((key) => {
        if (channel[key] != target[key]) {
          //1つでも要素が一致していなかったらFalseにする
          //でも、これだと要素が変更したときに気づかない可能性がありそう
          isMatched = false;
        }
      });

      return { ...channel, isAllMatched: isMatched };
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
          channelIconURL: channel.channelIconURL,
          channelName: channel.channelName,
          isOfficial: channel.isOfficial,
          name: channel.name,
          Twitter: channel.Twitter,
          Twitch: channel.Twitch,
          dataCenter: channel.dataCenter,
          server: channel.server,
          beginTime: channel.beginTime,
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
