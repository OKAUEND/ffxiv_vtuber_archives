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
};
