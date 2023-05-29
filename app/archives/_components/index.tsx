'use client';

import { Suspense } from 'react';
import { ErrorBoundaryExtended } from '@/app/_components/ErrorBoundary';
import { Archives } from './router';

interface IProps {
  channelID: string;
}

const ArchivesRoute = ({ channelID }: IProps) => {
  return (
    <div>
      <ErrorBoundaryExtended>
        <Suspense fallback={<div>Route Loading...</div>}>
          <Archives channelID={channelID} />
        </Suspense>
      </ErrorBoundaryExtended>
    </div>
  );
};

export default ArchivesRoute;
