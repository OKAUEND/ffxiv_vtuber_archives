import { afterAll, afterEach, beforeAll } from 'vitest';
import { loadEnvConfig } from '@next/env';
import { server } from '../server';
import 'whatwg-fetch';

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

loadEnvConfig(process.cwd());
