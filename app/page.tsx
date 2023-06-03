import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import styles from '@/app/_styles/rootPage.module.scss';

import { Pagination } from './_components/Pagination';
import { getChannel } from '@/app/channels/_lib/api/getChannel';
import { ChannelPanel } from '@/app/channels/_components/ChannelPanel';
import { ErrorBoundaryExtended } from '@/app/_components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const channels = await getChannel('1');
  return (
    <main className={styles.rootPage}>
      <ErrorBoundaryExtended>
        <ChannelPanel channels={channels} />

        <Pagination basePath="channels" currentPageNumber={1} />
      </ErrorBoundaryExtended>
    </main>
  );
}
