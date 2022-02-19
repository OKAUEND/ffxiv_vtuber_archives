import React, { ReactNode, useEffect } from 'react';

import { useYoutube } from '../api/getYoutube';

import { useArchives } from '../hook/useArchives';

interface Props {
    channelId: string;
    isEnabled: boolean;
    onClick: () => void;
    store: (youtubeArchives: GoogleApiYouTubeSearchResource[]) => void;
}

const NextLoad = ({ channelId, isEnabled, onClick, store }: Props) => {
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
            {isEnabled && <button onClick={handlerClick}>次をロード</button>}
        </div>
    );
};

export default NextLoad;
