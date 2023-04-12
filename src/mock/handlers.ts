import { rest } from 'msw';

import { channelPostHandler } from '@/src/features/Channels/mock';
import {
    archiveAPIRouterHandler,
    youtubePostHandler,
} from '../features/Archives/mock';

export const handlers = [
    channelPostHandler(),
    archiveAPIRouterHandler(),
    youtubePostHandler(),
];
