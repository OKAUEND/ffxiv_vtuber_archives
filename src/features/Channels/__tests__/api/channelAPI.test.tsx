import http from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';

import { HikasenVtuber } from '../../types/index';

const HikasenVtuberResourceFactory = (name: string): HikasenVtuber => {
    return {
        channelID: name,
        channelIconID: name,
        name: name,
        twitter: '',
        twitch: '',
        ffxiv: {
            dataCenter: 'test',
            server: 'test',
        },
    };
};

describe('Channel Get API TEST', () => {
    test('APIをコールされた時にAPIRouterが値を返すか', async () => {});
});
