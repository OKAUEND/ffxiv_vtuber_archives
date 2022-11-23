import { rest } from 'msw';

import { HikasenVtuber } from '@/src/features/Channels/types';
const channnel: HikasenVtuber = {
    channelID: 'test',
    channelIconID: 'test',
    name: 'test',
    twitter: 'test',
    twitch: 'test',
    ffxiv: {
        dataCenter: 'test',
        server: 'test',
    },
};

const Archives: GoogleApiYouTubeSearchResource[] = [
    {
        kind: 'name',
        etag: 'name',
        id: {
            kind: 'name',
            videoId: 'name',
            channelId: 'name',
            playlistId: 'name',
        },
        snippet: {
            publishedAt: '20200101',
            channelId: 'name',
            title: 'name',
            description: 'name',
            thumbnails: {
                default: {
                    url: 'name',
                    width: 99,
                    height: 99,
                },
                high: {
                    url: 'name',
                    width: 99,
                    height: 99,
                },
                medium: {
                    url: 'name',
                    width: 99,
                    height: 99,
                },
            },
            channelTitle: 'name',
        },
    },
];

export const handlers = [
    rest.post('/api/channel', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([channnel]));
    }),
    rest.post('/api/archives', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([Archives]));
    }),
];
