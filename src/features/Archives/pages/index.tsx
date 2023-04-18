import React, { Suspense } from 'react';
import { ErrorBoundaryExtended } from '@/src/component/Error/ErrorBoundary';

import { Archive } from '@/src/features/Archives/pages/Archive';

export const ArchiveRouter = () => {
    return (
        <div className="w-full md:w-1/2">
            <ErrorBoundaryExtended>
                <Suspense>
                    <Archive />
                </Suspense>
            </ErrorBoundaryExtended>
        </div>
    );
};
