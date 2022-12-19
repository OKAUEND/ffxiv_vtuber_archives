import { describe, expect, test } from 'vitest';
import { channelPostHandler } from '@/src/features/Channels/mock';
import { createRequest, createResponse } from 'node-mocks-http';
import { GetServerSidePropsContext } from 'next';

import { handler } from '@/src/features/Channels/api/channel';
import { handlers } from '@/src/mock/handlers';
import { setupMockServer } from '@/src/mock/test/setup';

const server = setupMockServer(handlers);

describe('Channel - getServerSideProps', () => {
    const mockCtx = (): GetServerSidePropsContext => ({
        req: createRequest(),
        res: createResponse(),
        params: undefined,
        query: {},
        resolvedUrl: '',
    });

    test('200 - 成功時', async () => {});
    test('400 - 失敗時', () => {});
    test('500 - 失敗時', () => {});
});
