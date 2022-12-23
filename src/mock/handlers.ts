import { rest } from 'msw';

import { channelPostHandler } from '@/src/features/Channels/mock';
import { archivePostHandler } from '../features/Archives/mock';

export const handlers = [channelPostHandler(), archivePostHandler()];
