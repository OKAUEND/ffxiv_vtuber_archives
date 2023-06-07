import { HikasenVtuber } from '@/(types)/';

export const getChannel = async (offset: string): Promise<HikasenVtuber[]> => {
  const BASE_QUERY_COUNT = 20;
  const query =
    Number(offset) === 1
      ? ''
      : `?offset=${BASE_QUERY_COUNT * (Number(offset) - 1)}&limit=20`;

  const URL = process.env.NEXT_PUBLIC_CHANNELLIST_URL;
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
