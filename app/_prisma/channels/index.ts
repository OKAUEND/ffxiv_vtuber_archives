import { HikasenVtuber, Tags } from '@/(types)';
import { getChannels, getChannelsCount } from './api/getChannels';

type GetChannel = <T>(
  offset?: string,
  params?: T
) => Promise<readonly [HikasenVtuber<Tags>[], number]>;

const getChannel: GetChannel = async (
  offset,
  params
): Promise<readonly [HikasenVtuber<Tags>[], number]> => {
  //モバイルでのみやすさも考慮し、20件ほどに絞る。10件だけはPCやタブレットで見るには少なすぎる
  const BASE_QUERY_COUNT = 20;
  //何も指定がないときのためのガード構文
  const offsetNumber = offset ? Number(offset) : 1;

  //ページ番号よりOffsetでずらす件数を作成し、+1することで、同じ要素の重複取得を防ぐ
  const skip =
    offsetNumber === 1 ? 0 : BASE_QUERY_COUNT * (offsetNumber - 1) + 1;

  const result = await getChannels(skip, params);
  const count = await getChannelsCount(params);

  return [result, count] as const;
};

export default getChannel;
