'use client';

import { useArchives } from '@/app/archives/(hooks)/useArchives';
import { ArchiveList } from '@/app/archives/_components/Archives';
import { NextLoad } from '@/app/archives/_components/NextLoad';
import { LoadingBasicAnimation } from '@/app/_components/Loading';

interface Props {
  channelID: string;
}

export const Archives = ({ channelID }: Props) => {
  const { archives } = useArchives(channelID);
  return (
    <div>
      <ArchiveList Archives={[...archives.archives]} />
      {archives.loading ? (
        <LoadingBasicAnimation />
      ) : (
        <NextLoad channelID={channelID} />
      )}
    </div>
  );
};
