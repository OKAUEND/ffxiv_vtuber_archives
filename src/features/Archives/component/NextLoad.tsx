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

const NextLoad = ({ channelId }: Props) => {
    const [, updateQuery] = useYoutube(channelId);

    const handlerClick = () => {
        updateQuery('202002');
    };

    return (
        <div>
            <button onClick={handlerClick}>次をロード</button>
        </div>
    );
};

export default NextLoad;
