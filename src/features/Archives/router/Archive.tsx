import React, { Suspense } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import NextLoad from '../component/NextLoad';
import { useArchives } from '../hook/useArchives';
import { useTimeRange } from '../hook/useTimeRange';

type Props = {
    channelId: string;
};

export const Archive = (props: Props) => {
    const [, createTimeRange] = useTimeRange();
    const [Archives, addArchives] = useArchives(props.channelId);
    const onClick = () => {
        createTimeRange(Archives.splice(-1)[0].snippet.publishedAt);
    };

    const storeArchives = (
        youtubeArchives: GoogleApiYouTubeSearchResource[]
    ) => {
        addArchives(youtubeArchives);
    };
    return (
        <div>
            <div>
                <ArchiveList Archives={Archives} />
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad
                        channelId={props.channelId}
                        onClick={onClick}
                        store={storeArchives}
                    />
                </Suspense>
            </div>
        </div>
    );
};
