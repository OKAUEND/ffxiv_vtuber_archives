import styles from '@/_styles/rootPage.module.scss';

import { ChannelIndex } from '@/channels/_components/ChannelIndex';
import { getChannel } from '@/_prisma';
import Link from 'next/link';

export default async function Home() {
  const [channels, totalCount] = await getChannel();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.search_content}>
          <Link className={styles.link} href={'/channels/search'}>
            配信者を探す→
          </Link>
        </div>
        <ChannelIndex totalCount={totalCount} channels={channels} page="1" />
      </div>
    </div>
  );
}
