import http from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';
import { setupServer } from 'msw/node';

import { channelPostHandler } from '@/src/features/Channels/mock';

import { handler } from '@/src/features/Channels/api/channel';
import { handlers } from '@/src/mock/handlers';
import { HikasenVtuber } from '../../types/index';

const server = setupServer(...handlers);

describe('Channel Get API TEST', () => {
    const params = {
        handler,
        url: '/api/channel',
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
        method: 'POST',
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
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual(
                        HikasenVtuberResourceFactory('Mock')
                    );
                },
            });
        });
    });
});
