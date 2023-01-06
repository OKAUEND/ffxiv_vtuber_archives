import { rest } from 'msw';

import { channelPostHandler } from '@/src/features/Channels/mock';
import {
    archivePostHandler,
    youtubePostHandler,
} from '../features/Archives/mock';

export const handlers = [
    channelPostHandler(),
    archivePostHandler(),
    youtubePostHandler(),
];
