import { HikasenVtuber, Tags } from '@/(types)/';
import { getChannelCount, getChannelOffset } from '@/_utile/prisma';
import { ChannelSearchParams } from '@/channels/(types)';
import { createWhereQuery } from '../prisma/createChannelQuery';

type GetChannel = (
  offset: string,
  params?: ChannelSearchParams
) => Promise<readonly [HikasenVtuber<Tags>[], number]>;

/**
 * 配信者の一覧を取得する。クエリパラメータを渡すことで、配信者に対する検索も行うことができる。
 * @param offset ページの現在番号
 * @param params クエリパラメータ。型の形式は文字列ではなく、Next.jsのsearchParamsの型を元に、文字列の配列である。
 * @returns
 */
export const getChannel: GetChannel = async (
  offset,
  params
): Promise<readonly [HikasenVtuber<Tags>[], number]> => {
  //
  const query = createWhereQuery(params);

  //モバイルでのみやすさも考慮し、20件ほどに絞る。10件だけはPCやタブレットで見るには少なすぎる
  const BASE_QUERY_COUNT = 20;
  //何も指定がないときのためのガード構文
  const offsetNumber = offset ? Number(offset) : 1;

  //ページ番号よりOffsetでずらす件数を作成し、+1することで、同じ要素の重複取得を防ぐ
  const skip =
    offsetNumber === 1 ? 0 : BASE_QUERY_COUNT * (offsetNumber - 1) + 1;

  const channels = await getChannelOffset(skip);
  const count = await getChannelCount();

  return [channels, count] as const;
};
