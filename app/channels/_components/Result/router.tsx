import { getChannelWhere } from '@/channels/_lib/api/getChannelWhere';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ChannelSearchParams } from '@/channels/(types)';
import { Pagination } from '@/_components/Pagination';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';

import styles from '@/_styles/rootPage.module.scss';

interface IProps {
  page: string;
  params: ChannelSearchParams;
}

export const ChannelResult = async ({ page, params }: IProps) => {
  const [channels, count] = await getChannelWhere(params, page);
  return (
    <section className={styles.content}>
      <ErrorBoundaryExtended>
        <ChannelPanel channels={channels} />

        <Pagination<ChannelSearchParams>
          basePath="channels/result/"
          currentPageNumber={Number(page)}
          totalCount={count}
        />
      </ErrorBoundaryExtended>
    </section>
  );
};
