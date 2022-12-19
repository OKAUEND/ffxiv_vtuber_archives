import { describe, expect, test } from 'vitest';
import { channelPostHandler } from '@/src/features/Channels/mock';
import { createRequest, createResponse } from 'node-mocks-http';
import { GetServerSidePropsContext } from 'next';

import { handler } from '@/src/features/Channels/api/channel';
import { handlers } from '@/src/mock/handlers';
import { setupMockServer } from '@/src/mock/test/setup';

import { getServerSideProps } from '../../../../pages/';
import { HikasenVtuberResourceFactory } from '@/src/features/Channels/mock';

const server = setupMockServer(handlers);

describe('Channel - getServerSideProps', () => {
    const mockCtx = (): GetServerSidePropsContext => ({
        req: createRequest(),
        res: createResponse(),
        params: undefined,
        query: {},
        resolvedUrl: '',
    });

    function assertHasProps<T>(item): asserts item is { props: T } {
        const err = (): void => {
            throw new Error('no props');
        };
        if (typeof item != 'object') err();
        if (!(item as any)['props']) err();
        if (typeof (item as any).props != 'object') err();
    }

    test('200 - 成功時', async () => {
        const res = await getServerSideProps(mockCtx());
        assertHasProps(res);
        const channel = res.props['channels']['data'];
        expect(channel).toStrictEqual([HikasenVtuberResourceFactory('Mock')]);
    });
    test('400 - 失敗時', async () => {
        server.use(channelPostHandler(400));
        const res = await getServerSideProps(mockCtx());
        assertHasProps(res);
        const channel = res.props['channels'];
        expect(channel).toStrictEqual([]);
    });
    test('500 - 失敗時', () => {});
});
