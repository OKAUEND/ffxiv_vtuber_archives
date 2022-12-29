import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';

import { archivePostHandler } from '@/src/features/Archives/mock';

import { handler } from '@/src/features/Archives/api/archives';
import { handlers } from '@/src/mock/handlers';
import { setupMockServer } from '@/src/mock/test/setup';
import { GoogleYoutubeFactory } from '../../mock';

const server = setupMockServer(handlers);

describe('Youtube Live GET API TEST', () => {
    const testname = 'MockChannel';
    describe('GET', () => {
        const requestInit = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        };
        const Result = () => {};
        test('200', async () => {
            const params = {
                handler,
                url: `/api/archives?channelId=${testname}`,
            };
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual({
                        item: [GoogleYoutubeFactory('Mock')],
                        status: 200,
                    });
                },
            });
        });
        test('Queryを付与してAPIコールをできるか', async () => {
            const token = 'MockToken';
            const params = {
                handler,
                url: `/api/archives?channelId=${testname}&nextPagetoken=${token}`,
            };
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual({
                        item: [GoogleYoutubeFactory(testname, token)],
                        status: 200,
                    });
                },
            });
        });
        test('400', async () => {
            const params = {
                handler,
                url: `/api/archives?channelId=${testname}`,
            };
            server.use(archivePostHandler(400));
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual({
                        message: 'Bad Request',
                        status: 400,
                        error: true,
                    });
                },
            });
        });
        test('400 - ChannelIDの指定がない場合は、エラーを返す', async () => {
            const params = {
                handler,
                url: `/api/archives?`,
            };
            await testApiHandler({
                ...params,
                test: async ({ fetch }) => {
                    const response = await fetch(requestInit);
                    await expect(response.json()).resolves.toStrictEqual({
                        message: 'Method ChannelID Not Allowed',
                        status: 400,
                        error: true,
                    });
                },
            });
        });
    });
});
