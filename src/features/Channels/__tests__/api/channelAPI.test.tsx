import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';

import { channelPostHandler } from '@/src/features/Channels/mock';

import { handler } from '@/src/features/Channels/api/channel';
import { handlers } from '@/src/mock/handlers';
import { HikasenVtuber } from '../../types/index';
import { setupMockServer } from '@/src/mock/test/setup';
import { HikasenVtuberResourceFactory } from '@/src/features/Channels/mock';

const server = setupMockServer(handlers);

describe('Channel Get API TEST', () => {
    const params = {
        handler,
        url: '/api/channel',
    };

    const requestInit = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
    };

    describe('GET', () => {
        test('200', async () => {
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual([
                        HikasenVtuberResourceFactory('Mock'),
                    ]);
                },
            });
        });
        test('400', async () => {
            server.use(channelPostHandler(400));
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual({
                        message: 'Bad Request',
                        status: 400,
                    });
                },
            });
        });
    });
});
