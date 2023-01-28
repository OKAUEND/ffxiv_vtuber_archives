import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { Channels, HikasenVtuber } from '@/src/features/Channels';
import { Suspense, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Data } from '@/src/types/api';
import { Error } from '@/src/component/Error';

type Props = Data<HikasenVtuber[]>;

export default function Home({ status, message, item, error }: Props) {
    if (error) return <Error status={status} message={message} />;
    return (
        <div className="min-h-screen grid grid-row-footer">
            <Head>
                <title>FFXIV - Vtubers</title>
                <meta name="description" content="ffxiv vtuber list" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-gray-800 h-full">
                <div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Channels ChannelsFirstPagenation={item} />
                    </Suspense>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const HOST = process.env.CHANNELLIST_URL;

    const response = await fetch(HOST, {
        method: 'POST',
    }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
            const err: Props = {
                message: data.message,
                status: response.status,
            };
            return err;
        }

        const success: Props = {
            item: data,
            status: response.status,
        };
        return data;
    });
    return {
        props: response,
    };
};
