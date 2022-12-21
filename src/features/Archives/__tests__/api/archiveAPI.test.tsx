import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';

import { channelPostHandler } from '@/src/features/Channels/mock';

import { handler } from '@/src/features/Channels/api/channel';
import { handlers } from '@/src/mock/handlers';
import { setupMockServer } from '@/src/mock/test/setup';

describe('Youtube Live GET API TEST', () => {
    describe('GET', () => {
        test('200', async () => {});
        test('400', async () => {});
    });
});
