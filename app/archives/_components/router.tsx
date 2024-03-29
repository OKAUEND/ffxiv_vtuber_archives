'use client';

import { useArchives, useVisible } from '@/archives/(hooks)/useArchives';
import { ArchiveList } from '@/archives/_components/Archives';
import { NextLoad } from '@/archives/_components/NextLoad';
import { LoadingBasicAnimation } from '@/_components/Loading';
import styles from '@/archives/_styles/archivesRoute.module.scss';

interface Props {
  channelID: string;
}

export const Archives = ({ channelID }: Props) => {
  const { archives } = useArchives(channelID);
  const { isVisible } = useVisible(channelID);
  return (
    <>
      <ArchiveList Archives={[...archives.archives]} />
      {isVisible ? (
        <div className={styles.load_container}>
          {archives.loading ? (
            <LoadingBasicAnimation />
          ) : (
            <NextLoad channelID={channelID} />
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
