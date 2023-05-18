import { useEffect } from 'react';
import { atom, DefaultValue, selector, useRecoilValue } from 'recoil';
import { HikasenVtuber } from '@/src/features/Channels/types';

//--------------------------------------------//

const HOST = process.env.NEXT_PUBLIC_HOST;

//--------------------------------------------//

const fetchChannels = async (): Promise<HikasenVtuber[]> => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  const date = await res.json();
  return date;
};

//--------------------------------------------//

const ChannelsAtom = atom<HikasenVtuber[]>({
  key: 'Channels-atom',
  default: [],
});

const channelsQuery = selector<HikasenVtuber[]>({
  key: 'query/channels',
  get: async () => {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbwEdmW8xsUb0O1RxyCbDVeCxUcKGPsU-V60FHplZslE6eYllYwHikTcHfIAFAUnIGtJBg/exec'
    );
    const date = await res.json();
    return date;
  },
});

const channelsList = selector<HikasenVtuber[]>({
  key: 'date-flow/channels',
  get: async ({ get }) => {
    return get(channelsQuery);
  },
});

//--------------------------------------------//

export const useChannels = () => {
  const channels = useRecoilValue<HikasenVtuber[]>(channelsList);

  return channels;
};
