import React from 'react';

import { useYoutube } from '../api/getYoutube';

interface Props {
    channelId: string;
}

const NextLoad = ({ channelId }: Props) => {
    const [, updateQuery] = useYoutube(channelId);

    const handlerClick = () => {
        updateQuery();
    };

    return (
        <div>
            <button onClick={handlerClick}>次をロード</button>
        </div>
    );
};

export default NextLoad;
