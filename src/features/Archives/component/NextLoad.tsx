import React from 'react';

import { useYoutube } from '../api/getYoutube';

import { Basic } from '../../../component/Element/Button';

interface Props {
    channelId: string;
}

const NextLoad = ({ channelId }: Props) => {
    const [, updateQuery] = useYoutube(channelId);

    const handlerClick = () => {
        updateQuery();
    };

    return (
        <Basic handler={handlerClick} size="auto" color="default">
            more...
        </Basic>
    );
};

export default NextLoad;
