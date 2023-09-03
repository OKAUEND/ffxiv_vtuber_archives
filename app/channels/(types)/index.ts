import { Prisma } from '@prisma/client';

export interface ChannelSearchParams {
  orderBy: string;
  year: string;
  content: string[];
  play: string[];
  timezone: string[];
}
