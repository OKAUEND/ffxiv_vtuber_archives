import React, { Suspense } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import NextLoad from '../component/NextLoad';
import { useArchives } from '../hook/useArchives';
import { useTimeRange } from '../hook/useTimeRange';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

type Props = {
    channelId: string;
};

export const Archive = (props: Props) => {
    const [timeRange, createTimeRange] = useTimeRange();
    const [Archives, lastArchivesDayTime, addArchives] = useArchives(
        props.channelId
    );
    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

    const onClick = () => {
        const lastDayTime = lastArchivesDayTime();
        if (isBeforeFirstDayTime(lastDayTime)) return;
        createTimeRange(lastDayTime);
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
                        timeRange={timeRange}
                        isEnabled={true}
                        isLoad={true}
                        onClick={onClick}
                        store={storeArchives}
                    />
                </Suspense>
            </div>
        </div>
    );
};
