import { describe, test, expect } from 'vitest';
import { Prisma } from '@prisma/client';
import { createWhereQuery } from '@/_prisma/channels/lib/createQuery';
import { ChannelSearchParams } from '@/channels/(types)';
import { PrismaQuery } from '@/_prisma/(types)';

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
  test('ソート順を指定するクエリパラメータがある時、指定通りにソートのプロパティが設定されているか', () => {
    //sort=desc
    const desc = createQueryFactory({ orderBy: 'desc' });

    const descQuery = createWhereQuery(desc);

    const descSort: Prisma.SortOrder = 'desc';

    expect(descQuery.orderBy).toEqual(descSort);

    //sort=desc
    const asc = createQueryFactory({ orderBy: 'asc' });

    const ascQuery = createWhereQuery(asc);

    const ascSort: Prisma.SortOrder = 'asc';

    expect(ascQuery.orderBy).toEqual(ascSort);
  });
  test('指定年のクエリパラメータがある時、指定年の開始日が1月1日で終了日が12月31日になっているか', () => {
    //year=2018
    const year = createQueryFactory({ year: '2018' });

    const yearQuery = createWhereQuery(year);

    const beginDayTime = new Date('2018');
    const endDayTime = new Date('2018');
    endDayTime.setMonth(12);
    endDayTime.setSeconds(-1);

    const beginTimeQuery: Prisma.ChannelWhereInput = {
      beginTime: {
        gte: beginDayTime.toISOString(),
        lt: endDayTime.toISOString(),
      },
    };

    expect(yearQuery.year).toEqual(beginTimeQuery);
  });
  test('プレイスタイル:contentのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {
    //["content",["raid","story","housing"]]
    const content = createQueryFactory({
      content: ['raid', 'story', 'housing'],
    });

    const contentQuery = createWhereQuery(content);

    expect(contentQuery.query.content).toEqual({
      tags: { some: { OR: [{ tag_id: 3 }, { tag_id: 1 }, { tag_id: 4 }] } },
    });
  });
  test('プレイスタイル:playのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {
    //play:["party","solo","farm"]
    const content = createQueryFactory({
      play: ['party', 'solo', 'farm'],
    });

    const playQuery = createWhereQuery(content);

    expect(playQuery.query.play).toEqual({
      tags: { some: { OR: [{ tag_id: 13 }, { tag_id: 14 }, { tag_id: 17 }] } },
    });
  });
  test('プレイスタイル:timezoneのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {
    //timezone:["morning","night","midnight"]
    const content = createQueryFactory({
      timezone: ['morning', 'night', 'midnight'],
    });

    const timezoneQuery = createWhereQuery(content);

    expect(timezoneQuery.query.timeZone).toEqual({
      tags: { some: { OR: [{ tag_id: 19 }, { tag_id: 22 }, { tag_id: 23 }] } },
    });
  });
  test('全てのクエリパラメータが設定されていた時、全てのPrismaWhere文を作成できているか', () => {
    //timezone:["morning","night","midnight"]
    const item = createQueryFactory({
      orderBy: 'desc',
      year: '2018',
      content: ['raid', 'story', 'housing'],
      play: ['party', 'solo', 'farm'],
      timezone: ['morning', 'night', 'midnight'],
    });

    const query = createWhereQuery(item);

    const descSort: Prisma.SortOrder = 'desc';
    const beginDayTime = new Date('2018');
    const endDayTime = new Date('2018');
    endDayTime.setMonth(12);
    endDayTime.setSeconds(-1);
    const beginTimeQuery: Prisma.ChannelWhereInput = {
      beginTime: {
        gte: beginDayTime.toISOString(),
        lt: endDayTime.toISOString(),
      },
    };

    expect(query.orderBy).toEqual(descSort);
    expect(query.year).toEqual(beginTimeQuery);
    expect(query.query.content).toEqual({
      tags: { some: { OR: [{ tag_id: 3 }, { tag_id: 1 }, { tag_id: 4 }] } },
    });
    expect(query.query.play).toEqual({
      tags: { some: { OR: [{ tag_id: 13 }, { tag_id: 14 }, { tag_id: 17 }] } },
    });
    expect(query.query.timeZone).toEqual({
      tags: { some: { OR: [{ tag_id: 19 }, { tag_id: 22 }, { tag_id: 23 }] } },
    });
  });
});
