import React, { useEffect } from 'react';

import {
    currentChannelId,
    youtubeSelector,
    timeRangeState,
    useYoutube,
} from '../api/getYoutube';

import { useArchives, archivesAtom } from '../hook/useArchives';

import {
    useRecoilValue,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
} from 'recoil';
export const NextLoad = () => {
    const [currentChannelIdState] = useRecoilState(currentChannelId);
    const archives = useArchives(currentChannelIdState);
    const setArchives = useSetRecoilState(archivesAtom(currentChannelIdState));
    const youtubeResult = useYoutube();
    const setTimeRange = useSetRecoilState(timeRangeState);

    useEffect(() => {
        setArchives(youtubeResult);
    }, [youtubeResult]);

    const setNextLoadTimeRange = () => {
        const lastArchiveTime = new Date(
            archives.slice(-1)[0].snippet.publishedAt
        );
        lastArchiveTime.setMinutes(lastArchiveTime.getMinutes() - 1);
        const endTime = lastArchiveTime.toISOString();
        lastArchiveTime.setMonth(lastArchiveTime.getMonth() - 6);
        const beginTime = lastArchiveTime.toISOString();
        setTimeRange({
            EndTime: endTime,
            BeginTime: beginTime,
        });
    };
    return (
        <div>
            <button onClick={setNextLoadTimeRange}>次をロード</button>
        </div>
    );
};
