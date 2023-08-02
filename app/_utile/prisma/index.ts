import { HikasenVtuber, Tag } from '@/(types)';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn'],
});

/**
 * プレイスタイルや配信スタイルなどの属性タグを、カテゴリー毎に分類しオブジェクトにする
 * @param channels PrismaChannel
 * @returns
 */
const convertTags = (channels): HikasenVtuber[] => {
  return channels.map((channel) => {
    //DBのタグ情報は、1つのテーブルに入っているので、種類毎に使いやすいように分割する
    const contents: Tag[] = [];
    const party: Tag[] = [];
    const timezone: Tag[] = [];
    channel.tags.forEach((tag) => {
      //ソートのために必要なID、表示に必要な名前、コードのみにオブジェクトを限定する
      const convert = {
        id: tag.tags.id,
        name: tag.tags.name,
        code: tag.tags.code,
      };

      //見やすいようにSwitch文で切り分ける
      switch (tag.tags.type) {
        case 'content':
          contents.push(convert);
          break;
        case 'play':
          party.push(convert);
          break;
        case 'timezone':
          timezone.push(convert);
          break;
        default:
          break;
      }
    });

    //サーバー登録順は必ずしもID順に並んでいないので、ID順に並べ直させる
    contents.sort((a, b) => {
      return a.id - b.id;
    });
    party.sort((a, b) => {
      return a.id - b.id;
    });
    timezone.sort((a, b) => {
      return a.id - b.id;
    });

    //
    return {
      ...channel,
      tags: {
        content: contents,
        party: party,
        timezone: timezone,
      },
    };
  });
};

/**
 * 配信者一覧を降順で無条件取得をする
 * @param offset
 * @returns
 */
export const getChannelOffset = async (
  offset = 0
): Promise<HikasenVtuber[]> => {
  const channels = await prisma.channel.findMany({
    take: 20,
    skip: offset,
    orderBy: [
      {
        isOfficial: 'desc',
      },
      { beginTime: 'desc' },
    ],
    include: {
      tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  const result = channels.map((channel) => {
    return {
      ...channel,
      tags: channel.tags.map((tag) => {
        return {
          name: tag.tags.name,
          code: tag.tags.code,
          type: tag.tags.type,
        };
      }),
    };
  });

  return result;
};

/**
 * 配信者の件数を取得する
 * @returns count number
 */
export const getChannelCount = async () => {
  const res = await prisma.channel.count();
  return res;
};

/**
 * 配信者を条件で検索し、一致した配信者を取得する
 * @param offset 次回の取得を始めるスタート位置
 * @param query 検索条件 - PrismaのWhereの型を利用しオブジェクトを作成し渡す
 * @param orderBy 昇順降順の指定
 * @returns
 */
export const getChannelWhereOffset = async (
  offset = 0,
  query: Prisma.ChannelWhereInput,
  orderBy: Prisma.SortOrder
): Promise<HikasenVtuber[]> => {
  const res = await prisma.channel.findMany({
    take: 20,
    skip: offset,
    where: {
      isOfficial: false,
      ...query,
    },
    orderBy: [{ beginTime: orderBy }],
  });

  return res;
};

/**
 * 配信者を条件に一致する件数
 * @param query 検索条件 - PrismaのWhereの型を利用しオブジェクトを作成し渡す
 * @returns
 */
export const getChannelWhereCount = async (query: Prisma.ChannelWhereInput) => {
  const res = await prisma.channel.count({
    where: {
      isOfficial: false,
      ...query,
    },
  });
  return res;
};

export default prisma;
