import { selector, useRecoilValue } from 'recoil';

import { fetchExtend } from '@/_utile/fetch';
import { HikasenVtuber } from '@/(types)';

const channelList = selector({
  key: 'data-flow/channels',
  get: async () => {
    const data = await fetchExtend<HikasenVtuber[]>({
      url: '/api/control/',
      store: false,
    });
    return data;
  },
});

export const useAdminControl = () => {
  const channels = useRecoilValue(channelList);
  return channels;
};
