import { getChannelWhere } from '@/channels/_lib/api/getChannelWhere';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ChannelSearchParams } from '@/channels/(types)';
import { Pagination } from '@/_components/Pagination';

interface IProps {
  page: string;
  params: ChannelSearchParams;
}

export const ChannelResult = async ({ page, params }: IProps) => {
  const [channels, count] = await getChannelWhere(params, page);
  return (
    <>
      <ChannelPanel channels={channels} />
      <Pagination basePath="/" currentPageNumber={1} totalCount={count} />
    </>
  );
};
