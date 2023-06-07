'use client';

import { Suspense } from 'react';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { Archives } from './router';

interface IProps {
  channelID: string;
}

const ArchivesRoute = ({ channelID }: IProps) => {
  return (
    <>
      <ErrorBoundaryExtended>
        <Suspense fallback={<div>Route Loading...</div>}>
          <Archives channelID={channelID} />
        </Suspense>
      </ErrorBoundaryExtended>
    </>
  );
};

export default ArchivesRoute;
