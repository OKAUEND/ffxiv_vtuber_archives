import { vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { setupMockServer } from '@/src/mock/test/setup';

import { handlers } from '@/src/mock/handlers';

import { useFetch } from '../index';
import { useFetchAPIHandler, Success } from '../mock/handles';

const server = setupMockServer(handlers);

type Response = {
    message: string;
};

const mockPath = 'http://fetch.api.mock/';

describe('useFetch Unit Test', () => {
    test('通信成功:200', async () => {
        const { result } = renderHook(() =>
            useFetch<Response>({ url: mockPath })
        );

        const response = await result.current;
        expect(response.data).toEqual(Success);
        expect(response.error.status).toEqual(200);
        expect(response.error.hasError).toEqual(false);
    });
    test('通信エラー:400', async () => {
        server.use(useFetchAPIHandler(400));

        const { result } = renderHook(() =>
            useFetch<Response>({ url: mockPath })
        );

        const response = await result.current;
        expect(response.data).toEqual({});
        expect(response.error.status).toEqual(400);
        expect(response.error.hasError).toEqual(true);
    });
    test('通信エラー:404', async () => {
        server.use(useFetchAPIHandler(404));

        const { result } = renderHook(() =>
            useFetch<Response>({ url: mockPath })
        );

        const response = await result.current;
        expect(response.data).toEqual({});
        expect(response.error.status).toEqual(404);
        expect(response.error.hasError).toEqual(true);
    });
    test('通信エラー:500', async () => {
        server.use(useFetchAPIHandler(500));

        const { result } = renderHook(() =>
            useFetch<Response>({ url: mockPath })
        );
        const response = await result.current;
        expect(response.data).toEqual({});
        expect(response.error.status).toEqual(500);
        expect(response.error.hasError).toEqual(true);
    });
});
