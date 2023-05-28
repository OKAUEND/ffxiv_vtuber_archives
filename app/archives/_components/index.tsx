'use client';

import { useArchives } from '@/app/archives/(hooks)/useArchives';
import { ArchiveList } from '@/app/archives/_components/Archives';

interface Props {
  channelID: string;
}

const Archives = ({ channelID }: Props) => {
  const { archives, loadNextList } = useArchives(channelID);
  return (
    <div>
      <ArchiveList Archives={[...archives.archives]} />
      <button onClick={() => loadNextList(channelID)}>次を</button>
    </div>
  );
};

export default Archives;
