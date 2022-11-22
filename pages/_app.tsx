import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { setupWorker } from 'msw';

if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
        const handlers = require('@/src/mock/handlers');
        const worker = setupWorker(...handlers);
        worker.start();
    }
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}
