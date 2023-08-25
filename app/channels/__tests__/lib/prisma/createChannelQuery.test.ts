import { describe, test, expect } from 'vitest';
import {
  createWhereQuery,
  createWhereQueryJoinTagging,
} from '@/channels/_lib/prisma/createChannelQuery';
import { ChannelSearchParams, PrismaQuery } from '@/channels/(types)';

interface TestParams {
  orderBy?: Prisma.SortOrder;
  year?: string;
  content?: string[];
  play?: string[];
  timezone?: string[];
}

type createQueryFactory = ({
  orderBy,
  year,
  content,
  play,
  timezone,
}: TestParams) => ChannelSearchParams;

const createQueryFactory: createQueryFactory = ({
  orderBy = 'desc',
  year = '',
  content = [],
  play = [],
  timezone = [],
}) => {
  return {
    orderBy: orderBy,
    year: year,
    content: content,
    play: play,
    timezone: timezone,
  };
};

describe('createChannelQuery Unit TEST', () => {
  test('クエリパラメータが何も指定されていない時は、プロパティに空のオブジェクトが入ったQueryオブジェクトになる', () => {
    const query = createWhereQuery();

    const date: PrismaQuery = {
      query: {
        content: {},
        play: {},
        timeZone: {},
      },
      year: {},
      orderBy: 'desc',
    };

    expect(query).toEqual(date);
  });
  test('ソート順を指定するクエリパラメータがある時、指定通りにソートのプロパティが設定されているか', () => {});
  test('指定年のクエリパラメータがある時、指定年の開始日が1月1日で終了日が12月31日になっているか', () => {});
  test('プレイスタイル:contentのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {});
  test('プレイスタイル:playのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {});
  test('プレイスタイル:timezoneのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {});
});
