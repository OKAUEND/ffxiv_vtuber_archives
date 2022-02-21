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
    const [, createTimeRange] = useTimeRange();
    const [Archives, lastArchivesDayTime, addArchives] = useArchives(
        props.channelId
    );
    const onClick = () => {
        createTimeRange(lastArchivesDayTime());
    };
    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

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
                        isEnabled={isBeforeFirstDayTime(lastArchivesDayTime())}
                        onClick={onClick}
                        store={storeArchives}
                    />
                </Suspense>
            </div>
        </div>
    );
};
