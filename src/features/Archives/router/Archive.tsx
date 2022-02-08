import React, { Suspense } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import NextLoad from '../component/NextLoad';
import { useArchives } from '../hook/useArchives';
import { useTimeRange } from '../hook/useTimeRange';

type Props = {
    channelId: string;
};

export const Archive = (props: Props) => {
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
