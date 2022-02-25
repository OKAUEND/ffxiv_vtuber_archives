import React, { ReactNode, useEffect } from 'react';

import { useYoutube } from '../api/getYoutube';

import { useArchives } from '../hook/useArchives';

type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

interface Props {
    channelId: string;
    timeRange: timeRangetype;
    isEnabled: boolean;
    isLoad: boolean;
    onClick: () => void;
    store: (youtubeArchives: GoogleApiYouTubeSearchResource[]) => void;
}

const NextLoad = ({
    channelId,
    timeRange,
    isEnabled,
    isLoad,
    onClick,
    store,
}: Props) => {
    const [youtubeResult, setQuery] = useYoutube(
        channelId,
        timeRange.BeginTime,
        timeRange.EndTime
    );

    useEffect(() => {
        // setArchives([...archives, ...youtubeResult]);
        store(youtubeResult);
    }, [youtubeResult]);

    useEffect(() => {
        setQuery(channelId, timeRange.BeginTime, timeRange.EndTime, true);
    }, [timeRange.BeginTime]);

    const handlerClick = () => {
        onClick();
    };

    return (
        <div>
            {isEnabled && <button onClick={handlerClick}>次をロード</button>}
        </div>
    );
};

export default NextLoad;
