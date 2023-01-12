import { rest } from 'msw';

export const GoogleYoutubeFactory = (
    name: string = 'Mock',
    token: string = 'FirstToken'
): GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource> => {
    return {
        kind: name,
        etag: name,
        nextPageToken: token,
        prevPageToken: 'prev',

        pageInfo: {
            totalResults: 0,
            resultsPerPage: 0,
        },
        items: [
            {
                kind: name,
                etag: name,
                id: {
                    kind: name,
                    videoId: name,
                    channelId: name,
                    playlistId: name,
                },
                snippet: {
                    publishedAt: name,
                    channelId: name,
                    title: name,
                    description: name,
                    thumbnails: {
                        default: {
                            url: name,
                            width: 99,
                            height: 99,
                        },
                        high: {
                            url: name,
                            width: 99,
                            height: 99,
                        },
                        medium: {
                            url: name,
                            width: 99,
                            height: 99,
                        },
                    },
                    channelTitle: name,
                },
            },
        ],
    };
};

export const YoutubeResourceFactory = (
    name: string
): GoogleApiYouTubeSearchResource => {
    return {
        kind: name,
        etag: name,
        id: {
            kind: name,
            videoId: name,
            channelId: name,
            playlistId: name,
        },
        snippet: {
            publishedAt: name,
            channelId: name,
            title: name,
            description: name,
            thumbnails: {
                default: {
                    url: name,
                    width: 99,
                    height: 99,
                },
                high: {
                    url: name,
                    width: 99,
                    height: 99,
                },
                medium: {
                    url: name,
                    width: 99,
                    height: 99,
                },
            },
            channelTitle: name,
        },
    };
};

const path = () => 'vitest.live.com';

type Data = GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

type Error = {
    message: string;
    status: number;
};

export const youtubePostHandler = (status: 200 | 400 | 500 = 200) => {
    return rest.get<Data, { id: string }, Data | Error>(
        path(),
        async (req, res, ctx) => {
            const channelId = req.url.searchParams.get('channelId');
            const nextPageToken = req.url.searchParams.get('nextPagetoken');

            if (status === 400) {
                return res(
                    ctx.status(400),
                    ctx.json({
                        message: 'Bad Request',
                        status: 400,
                        error: true,
                    })
                );
            }

            if (status === 500) {
                return res(
                    ctx.status(status),
                    ctx.json({
                        message: 'Internal Server Error',
                        status: 500,
                        error: true,
                    })
                );
            }

            if (channelId && nextPageToken) {
                return res(
                    ctx.status(status),
                    ctx.json(GoogleYoutubeFactory(channelId, nextPageToken))
                );
            }

            return res(
                ctx.status(status),
                ctx.json(GoogleYoutubeFactory(channelId))
            );
        }
    );
};

export const archiveAPIRouterHandler = (status: 200 | 400 | 500 = 200) => {
    return rest.get<Data, { id: string }, Data | Error>(
        'https://www.api/archives',
        async (req, res, ctx) => {
            if (status === 400) {
                return res(
                    ctx.status(400),
                    ctx.json({ message: 'Bad Request', status: 400 })
                );
            }

            if (status === 500) {
                return res(
                    ctx.status(status),
                    ctx.json({
                        message: 'Internal Server Error',
                        status: 500,
                    })
                );
            }

            return res(
                ctx.status(status),
                ctx.json({
                    item: GoogleYoutubeFactory(),
                    status: 200,
                    message: 'Success',
                })
            );
        }
    );
};
