import React, { Suspense } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import NextLoad from '../component/NextLoad';
import { useArchives } from '../hook/useArchives';
import { useTimeRange } from '../hook/useTimeRange';

type Props = {
    channelId: string;
};

export const Archive = (props: Props) => {
    const [, saveTimeRange] = useTimeRange();
    const [Archives, addArchives] = useArchives(props.channelId);
    const saveLiveTimeRange = () => {
        console.log('');
    };

    const storeArchives = (
        youtubeArchives: GoogleApiYouTubeSearchResource[]
    ) => {
        addArchives(youtubeArchives);
    };
    return (
        <div>
            <div>
                <ArchiveList />
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad
                        channelId=""
                        onClick={saveLiveTimeRange}
                        store={storeArchives}
                    />
                </Suspense>
            </div>
        </div>
    );
};
