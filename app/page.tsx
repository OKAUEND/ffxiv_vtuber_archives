import '@/_styles/reset.scss';
import styles from '@/_styles/rootPage.module.scss';

import { Pagination } from './_components/Pagination';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { HikasenVtuber } from './(types)';
import { getChannelOffset } from './_utile/prisma';

const getChannel = async (): Promise<HikasenVtuber[]> => {
  return getChannelOffset(0);
};

export default async function Home() {
  const channels = await getChannel();
  return (
    <section className={styles.content}>
      <ErrorBoundaryExtended>
        <ChannelPanel channels={channels} />

        <Pagination basePath="channels" currentPageNumber={1} />
      </ErrorBoundaryExtended>
    </section>
  );
}
