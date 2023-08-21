import { HikasenVtuber, Tags } from '@/(types)';
import { PrismaClient, Prisma } from '@prisma/client';

import { convertTaggingToTags } from '@/_utile/convert';
import { PrismaQuery } from '@/channels/(types)';

export const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn'],
});

/**
 * 配信者を条件で検索し、一致した配信者を取得する
 * @param offset 次回の取得を始めるスタート位置
 * @param query 検索条件 - PrismaのWhereの型を利用しオブジェクトを作成し渡す
 * @param orderBy 昇順降順の指定
 * @returns
 */
export const getChannelResult = async (
  offset = 0,
  query: PrismaQuery
): Promise<HikasenVtuber<Tags>[]> => {
  const channels = await prisma.channel.findMany({
    take: 20,
    skip: offset,
    where: {
      AND: [query.query.content, query.query.play, query.query.timeZone],
      isOfficial: false,
      ...query.year,
    },
    orderBy: { beginTime: query.orderBy },
    include: {
      tags: {
        select: {
          tags: {
            select: {
              id: true,
              name: true,
              code: true,
              type: true,
            },
          },
        },
      },
    },
  });

  return convertTaggingToTags(channels);
};

/**
 * 配信者を条件に一致する件数
 * @param query 検索条件 - PrismaのWhereの型を利用しオブジェクトを作成し渡す
 * @returns
 */
export const getChannelResultCount = async (query: PrismaQuery) => {
  return await prisma.channel.count({
    where: {
      AND: [query.query.content, query.query.play, query.query.timeZone],
      isOfficial: false,
      ...query.year,
    },
  });
};

export default prisma;
