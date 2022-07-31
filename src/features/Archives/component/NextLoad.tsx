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
        <div>
            <Basic handler={handlerClick} size="medium" color="default">
                次をロード
            </Basic>
        </div>
    );
};

export default NextLoad;
