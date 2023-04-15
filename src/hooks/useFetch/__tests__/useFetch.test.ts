import {} from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { setupMockServer } from '@/src/mock/test/setup';

import { handlers } from '@/src/mock/handlers';

const server = setupMockServer(handlers);

describe('useFetch Unit Test', () => {
    test('通信成功:200', () => {});
    test('通信エラー:400', () => {});
    test('通信エラー:404', () => {});
    test('通信エラー:500', () => {});
});
