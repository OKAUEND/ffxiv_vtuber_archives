import styles from '@/_styles/rootPage.module.scss';

import { ChannelIndex } from '@/channels/_components/ChannelIndex';
import { HikasenVtuber, Tags } from './(types)';
import { getChannelResult, getChannelResultCount } from './_utile/prisma';
import Link from 'next/link';

const getChannel = async (): Promise<
  readonly [HikasenVtuber<Tags>[], number]
> => {
  const result = await getChannelResult(0);
  const count = await getChannelResultCount();

  return [result, count] as const;
};

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
