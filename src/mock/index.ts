import { server } from './server';
import { worker } from './browser';

async function initMock() {
    if (typeof window === 'undefined') {
        server.listen();
    } else {
        worker.start();
    }
}

initMock();

export {};
