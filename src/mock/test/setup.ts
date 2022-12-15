import { afterAll, afterEach, beforeAll } from 'vitest';
import { loadEnvConfig } from '@next/env';
import { server } from '../server';
import 'whatwg-fetch';
import { RequestHandler } from 'msw';
import { setupServer } from 'msw/node';

export const setupMockServer = (handler: RequestHandler[]) => {
    const server = setupServer(...handler);
    beforeAll(() => {
        server.listen({ onUnhandledRequest: 'error' });
    });
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());
    return server;
};

loadEnvConfig(process.cwd());
