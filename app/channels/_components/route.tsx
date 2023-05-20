import { getChannel } from '@/app/channels/_lib/api/getChannel';

export const Channel = async () => {
  const channels = await getChannel('2');
  return <div>TEST</div>;
};
