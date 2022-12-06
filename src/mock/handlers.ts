import { rest } from 'msw';

import { channelPostHandler } from '@/src/features/Channels/mock';

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

const HOST = process.env.NEXT_PUBLIC_HOST;

export const handlers = [
    channelPostHandler(),
    rest.get(`${HOST}/api/archives`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([Archives]));
    }),
];
