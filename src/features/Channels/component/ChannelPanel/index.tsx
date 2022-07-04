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
            <ul className={'w-80'}>
                {channels.map((channel) => (
                    <li
                        key={channel.channelID}
                        className={'flex flex-col p-4 m-4'}>
                        <div className="grid grid-row-3 grid-flow-col gap-4">
                            <div className="row-span-3">
                                <Link to={`/Channel/${channel.channelID}`}>
                                    <IconElement
                                        src={`${iconURL}${channel.channelIconID}`}
                                        size="Medium"
                                        radius="full"
                                    />
                                </Link>
                            </div>
                            <div className="row-span-1 col-span-2 mt-4 flex inline-block justify-center items-center \">
                                <Link
                                    to={`/Channel/${channel.channelID}`}
                                    className={'block max-h-6'}>
                                    {channel.name}
                                </Link>
                            </div>
                            <div className="row-span-2 col-span-2">
                                TAGTAGTAGTAGATGA
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return <div>{isTimeOut ? timeOutError() : success()}</div>;
};
