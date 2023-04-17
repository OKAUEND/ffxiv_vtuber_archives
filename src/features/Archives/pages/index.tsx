import React, { Suspense } from 'react';
import ErrorBoundary from '@/src/component/Error/ErrorBoundary';

import { Archive } from '@/src/features/Archives/pages/Archive';

export const ArchiveRouter = () => {
    return (
        <div className="w-full md:w-1/2">
            <ErrorBoundary>
                <Suspense>
                    <Archive />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};
