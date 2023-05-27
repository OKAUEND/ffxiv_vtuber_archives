'use client';

import { useArchives } from '@/app/archives/(hooks)/useArchives';

interface Props {
  channelID: string;
}

const Archives = ({ channelID }: Props) => {
  const channels = useArchives(channelID);
  return <div>TEST</div>;
};

export default Archives;
