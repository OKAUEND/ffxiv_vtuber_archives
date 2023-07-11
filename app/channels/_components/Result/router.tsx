import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ChannelSearchParams } from '@/channels/(types)';
import { Pagination } from '@/_components/Pagination';

interface IProps {
  page: string;
  params: ChannelSearchParams;
}

export const ChannelResult = async ({ page, params }: IProps) => {
  return (
    <>
      <ChannelPanel  />
      <Pagination />
    </>
  );
};
