'use client';

import { usePage } from '@/app/archives/(hooks)/useArchives';

interface IProps {
  channelID: string;
}

export const NextLoad = ({ channelID }: IProps) => {
  const [loadNextList] = usePage();
  return (
    <div>
      <button onClick={() => loadNextList(channelID)}>次をロード</button>
    </div>
  );
};
