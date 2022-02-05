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

interface Props {
    channelId: string;
    onClick: () => void;
    store: (youtubeArchives: GoogleApiYouTubeSearchResource[]) => void;
}

const NextLoad = ({ onNextLoad }: Props) => {
    const [currentChannelIdState] = useRecoilState(currentChannelId);
    const archives = useArchives(currentChannelIdState);
    const setArchives = useSetRecoilState(archivesAtom(currentChannelIdState));
    const youtubeResult = useYoutube();
    const setTimeRange = useSetRecoilState(timeRangeState);

    useEffect(() => {
        setArchives([...archives, ...youtubeResult]);
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
