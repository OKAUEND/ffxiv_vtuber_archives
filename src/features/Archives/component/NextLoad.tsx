import React, { ReactNode, useEffect, useState } from 'react';

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
    onClick: () => void;
    store: (youtubeArchives: GoogleApiYouTubeSearchResource[]) => void;
}

const NextLoad = ({
    channelId,
    timeRange,
    isEnabled,
    onClick,
    store,
}: Props) => {
    const [youtubeResult, setQuery] = useYoutube();

    useEffect(() => {
        // setArchives([...archives, ...youtubeResult]);
        store(youtubeResult);
    }, [youtubeResult]);

    useEffect(() => {
        setQuery(channelId, timeRange.BeginTime, timeRange.EndTime);
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
