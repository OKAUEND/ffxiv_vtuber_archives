import React, { useEffect } from 'react';

import {
    currentChannelId,
    youtubeSelector,
    timeRangeState,
    useYoutube,
} from '../api/getYoutube';
import {
    useRecoilValue,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
} from 'recoil';
export const NextLoad = () => {
    const [currentChannelIdState] = useRecoilState(currentChannelId);
    const youtubeResult = useYoutube();
    const setNextLoadTimeRange = () => {
    };
    return (
        <div>
            <button onClick={setNextLoadTimeRange}>次をロード</button>
        </div>
    );
};
