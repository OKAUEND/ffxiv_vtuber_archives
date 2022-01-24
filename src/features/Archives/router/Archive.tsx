import React, { Suspense } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import { NextLoad } from '../component/NextLoad';

export const Archive = () => {
    return (
        <div>
            <div>
                <ArchiveList />
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad />
                </Suspense>
            </div>
        </div>
    );
};
