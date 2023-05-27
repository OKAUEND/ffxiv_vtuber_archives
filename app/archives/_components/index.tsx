'use client';

import { useArchives } from '@/app/archives/(hooks)/useArchives';
import { ArchiveList } from '@/app/archives/_components/Archives';

interface Props {
  channelID: string;
}

const Archives = ({ channelID }: Props) => {
  const { archives } = useArchives(channelID);
  return (
    <div>
      <ArchiveList Archives={[...archives.archives]} />
    </div>
  );
};

export default Archives;
