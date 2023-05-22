import { getChannel } from '@/app/channels/_lib/api/getChannel';
import { ChannelPanel } from '@/app/channels/_components/ChannelPanel';

export const Channel = async () => {
  const channels = await getChannel('1');
  return (
    <div>
      <ChannelPanel channels={channels} />
    </div>
  );
};
