'use client';

import { Suspense } from 'react';
import { Archives } from './router';

interface IProps {
  channelID: string;
}

const ArchivesRoute = ({ channelID }: IProps) => {
  return (
    <div>
      <Suspense fallback={<div>Route Loading...</div>}>
        <Archives channelID={channelID} />
      </Suspense>
    </div>
  );
};

export default ArchivesRoute;
