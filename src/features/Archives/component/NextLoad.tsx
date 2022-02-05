import React, { ReactNode, useEffect } from 'react';

import {
    currentChannelId,
    youtubeSelector,
    useYoutube,
} from '../api/getYoutube';

import { useArchives } from '../hook/useArchives';

import {
    useRecoilValue,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
} from 'recoil';

interface Props {
    channelId: string;
    onClick: () => void;
    store: (youtubeArchives: GoogleApiYouTubeSearchResource[]) => void;
}

const NextLoad = ({ channelId, onClick, store }: Props) => {
    const [, , existsArchives] = useArchives(channelId);
    const youtubeResult = useYoutube(existsArchives());

    useEffect(() => {
        // setArchives([...archives, ...youtubeResult]);
        store(youtubeResult);
    }, [youtubeResult]);

    const handlerClick = () => {
        onClick();
    };

    return (
        <div>
            <button onClick={setNextLoadTimeRange}>次をロード</button>
        </div>
    );
};

export default NextLoad;
