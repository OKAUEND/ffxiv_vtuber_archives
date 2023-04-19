import React, { Suspense } from 'react';
import { ErrorBoundaryExtended } from '@/src/component/Error/ErrorBoundary';

import { Archive } from '@/src/features/Archives/pages/Archive';

export const ArchiveRouter = () => {
    return (
        <div className="w-full">
            <ErrorBoundaryExtended>
                <Suspense fallback={<div>Loading...</div>}>
                    <Archive />
                </Suspense>
            </ErrorBoundaryExtended>
        </div>
    );
};
