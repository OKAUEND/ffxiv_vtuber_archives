import React, { Suspense, useEffect, useState } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import NextLoad from '../component/NextLoad';
import { useArchives } from '../hook/useArchives';
import { useTimeRange } from '../hook/useTimeRange';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

import { useParams } from 'react-router-dom';

const typeGuard = (target: string | undefined) => {
    if (target === undefined) {
        return 'error';
    }
    return target;
};
export const Archive = () => {
    const { channelID } = useParams<'channelID'>();

    //TypeGuardでundefinedを除外する
    const targetChannelID = typeGuard(channelID);

    const [Archives, lastArchivesDayTime, addArchives, exists] =
        useArchives(targetChannelID);
    const [timeRange, createTimeRange] = useTimeRange(exists());

    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

    const onClick = () => {
        const lastDayTime = lastArchivesDayTime();
        if (isBeforeFirstDayTime(lastDayTime)) return;
        createTimeRange(lastDayTime);
    };

    useEffect(() => {
        if (exists()) return;
        const realTime = new Date().toISOString();
        createTimeRange(realTime);
    }, [targetChannelID]);

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
                        channelId={targetChannelID}
                        timeRange={timeRange}
                        isEnabled={true}
                        onClick={onClick}
                        store={storeArchives}
                    />
                </Suspense>
            </div>
        </div>
    );
};
