import { HikasenVtuber } from '@/(types)';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn'],
});

export const getChannelOffset = async (): Promise<HikasenVtuber[]> => {
  const res = await prisma.channel.findMany({
    orderBy: [
      {
        isOfficial: 'desc',
      },
      { beginTime: 'desc' },
    ],
  });

  return res;
};

export default prisma;
