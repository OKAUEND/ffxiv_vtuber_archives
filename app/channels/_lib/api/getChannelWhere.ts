import { getChannelWhereCount, getChannelWhereOffset } from '@/_utile/prisma';
import { ChannelSearchParams } from '@/channels/(types)';
import { Prisma } from '@prisma/client';

export const getChannelWhere = async (
  params: ChannelSearchParams,
  page: string
) => {
  const query = createWhereQuery(params);
};

const createWhereQuery = (
  params: ChannelSearchParams
): Prisma.ChannelWhereInput => {
  const keys = Object.entries(params);

  const query = keys.reduce((acc, currentKey) => {
    //ページ数をParameterで
    if (currentKey[0] === 'orderBy') return acc;

    //まずは配信時間のWhere文だけを作成する
    //後にタグ検索とかを行いたいので、改修はしようね
    const beginDayTime = new Date(currentKey[1]);
    const endDayTime = new Date(currentKey[1]);
    endDayTime.setMonth(12);
    endDayTime.setSeconds(-1);

    const where: Prisma.ChannelWhereInput = {
      beginTime: {
        //開始日時
        gte: beginDayTime,
        //終了日時
        lt: endDayTime,
      },
    };

    return where;
  }, {});

  return query;
};
