import '@/_styles/reset.scss';
import styles from '@/_styles/rootPage.module.scss';

import { Pagination } from './_components/Pagination';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { HikasenVtuber } from './(types)';
import { getChannelOffset, getChannelCount } from './_utile/prisma';

const getChannel = async (): Promise<readonly [HikasenVtuber[], number]> => {
  const channels = await getChannelOffset(0);
  const count = await getChannelCount();

  return [channels, count] as const;
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
