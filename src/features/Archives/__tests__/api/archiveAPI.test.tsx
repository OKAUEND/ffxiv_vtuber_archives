import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';

import { channelPostHandler } from '@/src/features/Channels/mock';

import { handler } from '@/src/features/Archives/api/archives';
import { handlers } from '@/src/mock/handlers';
import { setupMockServer } from '@/src/mock/test/setup';
import { GoogleYoutubeFactory } from '../../mock';

const server = setupMockServer(handlers);

describe('Youtube Live GET API TEST', () => {
    describe('GET', () => {
        const requestInit = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        };
        test('200', async () => {
            const params = {
                handler,
                url: '/api/archives',
            };
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual([
                        GoogleYoutubeFactory('Mock'),
                    ]);
                },
            });
        });
        test('400', async () => {});
    });
});
