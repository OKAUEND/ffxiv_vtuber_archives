import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../server';
import 'whatwg-fetch';

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
