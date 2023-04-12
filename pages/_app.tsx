import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

if (process.env.NODE_ENV === 'development') {
    require('@/src/mock');
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}
