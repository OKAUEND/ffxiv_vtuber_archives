import { HikasenVtuber } from '@/(types)/';
import prisma from '@/_utile/prisma';

export const getChannel = async (offset: string): Promise<HikasenVtuber[]> => {
  const BASE_QUERY_COUNT = 20;
  const query =
    Number(offset) === 1
      ? ''
      : `?offset=${BASE_QUERY_COUNT * (Number(offset) - 1)}&limit=20`;

  const res = await prisma.channel.findMany({
    orderBy: {
      isOfficial: 'desc',
    },
  });

  return res;
};
