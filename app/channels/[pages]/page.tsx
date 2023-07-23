import styles from '@/_styles/rootPage.module.scss';

import { getChannel } from '@/channels/_lib/api/getChannel';
import { ChannelIndex } from '@/channels/_components/ChannelIndex';

export default async function Article({
  params,
}: {
  params: { pages: string };
}) {
  const [channels, count] = await getChannel(params.pages);
  return (
    <div className={styles.content}>
      <ChannelIndex
        totalCount={count}
        channels={channels}
        page={params.pages}
      />
    </div>
  );
}
