import prisma from '../../PrismaClient';
import { HikasenVtuber, Tags } from '@/(types)';
import { createWhereQuery } from '../lib/createQuery';
import { convertTaggingToTags } from '@/_utile/convert';

/**
 * 配信者を条件で検索し、一致した配信者を取得する
 * @param offset 次回の取得を始めるスタート位置
 * @param query 検索条件 - PrismaのWhereの型を利用しオブジェクトを作成し渡す
 * @param orderBy 昇順降順の指定
 * @returns
 */
export const getChannels = async <T>(
  offset = 0,
  params?: T
): Promise<HikasenVtuber<Tags>[]> => {
  //Next.jsのクエリパラメータから、PrismaのWhere文の要素を作成する
  const query = createWhereQuery(params);

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
export const getChannelsCount = async <T>(params?: T) => {
  //Next.jsのクエリパラメータから、PrismaのWhere文の要素を作成する
  const query = createWhereQuery(params);

  return await prisma.channel.count({
    where: {
      AND: [query.query.content, query.query.play, query.query.timeZone],
      isOfficial: false,
      ...query.year,
    },
  });
};
