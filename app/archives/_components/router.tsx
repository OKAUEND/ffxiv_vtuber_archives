'use client';

import { useArchives } from '@/archives/(hooks)/useArchives';
import { ArchiveList } from '@/archives/_components/Archives';
import { NextLoad } from '@/archives/_components/NextLoad';
import { LoadingBasicAnimation } from '@/_components/Loading';

interface Props {
  channelID: string;
}

export const Archives = ({ channelID }: Props) => {
  const { archives } = useArchives(channelID);
  return (
    <>
      <ArchiveList Archives={[...archives.archives]} />
      {archives.loading ? (
        <LoadingBasicAnimation />
      ) : (
        <NextLoad channelID={channelID} />
      )}
    </>
  );
};
