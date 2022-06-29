import React from 'react';
import { useChannels } from '../../api/getChannels';
import { useTimeOutError } from '../../../../hooks/timeout/index';
import { Link } from 'react-router-dom';

import { IconElement } from '../../../../component/Element/Icon';

export const ChannelPanel = () => {
    const [channels, resultStatus, reload] = useChannels();
    const [isTimeOut] = useTimeOutError(resultStatus);

    const iconURL = import.meta.env.VITE_YOUTUBE_CHANNEL_ICON_URL;

    {
        /* 
        Timeoutした場合はこの下のTimeout処理をかく 
        理由：サイドリロードさせたいので
        */
    }
    const timeOutError = () => {
        return (
            <div>
                <h3>タイムアウトエラー</h3>
                <button onClick={reload}>再度読み込む</button>
            </div>
        );
    };

    const success = () => {
        return (
            <ul>
                {channels.map((channel) => (
                    <li key={channel.channelID}>
                        <div>
                            <Link to={`/Channel/${channel.channelID}`}>
                                <IconElement
                                    src={`${iconURL}${channel.channelIconID}`}
                                    size="Medium"
                                    isradius={true}
                                />
                                {channel.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return <div>{isTimeOut ? timeOutError() : success()}</div>;
};
