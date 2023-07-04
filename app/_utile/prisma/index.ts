import { HikasenVtuber } from '@/(types)';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn'],
});

export const getChannelOffset = async (
  offset = 0
): Promise<HikasenVtuber[]> => {
  const res = await prisma.channel.findMany({
    take: 20,
    skip: offset,
    orderBy: [
      {
        isOfficial: 'desc',
      },
      { beginTime: 'desc' },
    ],
  });

  return res;
};

export const getChannelCount = async () => {
  const res = await prisma.channel.count();
  return res;
};

export default prisma;
