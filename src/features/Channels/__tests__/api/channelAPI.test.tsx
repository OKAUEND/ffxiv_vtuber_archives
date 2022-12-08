import http from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';

import { handler } from '@/src/features/Channels/api/channel';

import { HikasenVtuber } from '../../types/index';

describe('Channel Get API TEST', () => {
    const HOST = process.env.NEXT_PUBLIC_HOST;
    const params = {
        handler,
        url: `${HOST}/api/channel`,
    };

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

    const requestInit = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(HikasenVtuberResourceFactory('Mock')),
    };
    describe('getServerSideProps', () => {
        test('200', async () => {});
    });

    describe('GET', () => {
        test('200', async () => {
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {},
            });
        });
    });
});
