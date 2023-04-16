import { rest } from 'msw';

import { channelPostHandler } from '@/src/features/Channels/mock';
import {
    archiveAPIRouterHandler,
    youtubePostHandler,
} from '../features/Archives/mock';
import { useFetchAPIHandler } from '@/src/hooks/useFetch/mock/handles';

export const handlers = [
    channelPostHandler(),
    archiveAPIRouterHandler(),
    youtubePostHandler(),
    useFetchAPIHandler(),
];
