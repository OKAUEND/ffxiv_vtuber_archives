import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const GoogleYoutubeFactory = (
    channelId: string
): GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource> => {
    return {
        kind: channelId,
        etag: channelId,
        items: [
            {
                kind: channelId,
                etag: channelId,
                id: {
                    kind: channelId,
                    videoId: channelId,
                    channelId: channelId,
                    playlistId: channelId,
                },
                snippet: {
                    publishedAt: channelId,
                    channelId: channelId,
                    title: channelId,
                    description: channelId,
                    thumbnails: {
                        default: {
                            url: channelId,
                            width: 99,
                            height: 99,
                        },
                        high: {
                            url: channelId,
                            width: 99,
                            height: 99,
                        },
                        medium: {
                            url: channelId,
                            width: 99,
                            height: 99,
                        },
                    },
                    channelTitle: channelId,
                },
            },
        ],
    };
};

const run = (client: AxiosInstance, url: string) => {
    const mock = new MockAdapter(client);
    const item = () => {
        switch (url) {
            case import.meta.env.VITE_CHANNELLIST_SPREADSHEET_URL:
                return [];
            default:
                return GoogleYoutubeFactory('a4Ae-BCAvGI');
        }
    };
    mock.onGet(url).reply(200, [item]);
};

export { run };
