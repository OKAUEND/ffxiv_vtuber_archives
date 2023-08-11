import { Prisma } from '@prisma/client';
import { tags } from '../api/getTags';
import { ChannelSearchParams, PrismaQuery } from '@/channels/(types)';

/**
 * クエリパラメータの文字列(Code)の配列を、該当するTag情報のIDの配列へ変換をする
 * @param params
 * @returns
 */
const convertTags = (params: string | string[]): number[] => {};


export const createWhereQuery = (params: ChannelSearchParams): PrismaQuery => {
  const keys: [string, string | string[]][] = Object.entries(params);

  //クエリパラメータをループで処理し、queryオブジェクトにマージしていくことで、1つの検索条件オブジェクトとする
  let query: Prisma.ChannelWhereInput = {};
  let orderBy: Prisma.SortOrder = 'desc';
  keys.forEach((value) => {
    switch (value[0]) {
      case 'sort':
        if (Array.isArray(value[1])) return;

        if (value[1] === 'asc') return (orderBy = 'desc');

        orderBy = 'asc';
        break;
      case 'year': {
        if (Array.isArray(value[1])) return;

        const time = new Date(value[1]);

        //まずは配信時間のWhere文だけを作成する
        //後にタグ検索とかを行いたいので、改修はしようね
        const beginDayTime = new Date(time);
        const endDayTime = new Date(time);
        endDayTime.setMonth(12);
        endDayTime.setSeconds(-1);

        const where: Prisma.ChannelWhereInput = {
          beginTime: {
            //開始日時
            gte: beginDayTime.toISOString(),
            //終了日時
            lt: endDayTime.toISOString(),
          },
        };
        query = { ...query, ...where };
        break;
      }
      case 'content':
      case 'play':
      case 'timezone': {
        break;
      }
      default:
        break;
    }
  });

  return query;
};
