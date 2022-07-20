import React from 'react';
import { useChannels } from '../../api/getChannels';
import { useTimeOutError } from '../../../../hooks/timeout/index';
import { Link } from 'react-router-dom';

import { IconElement } from '../../../../component/Element/Image';

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
            <ul className="flex justify-center flex-wrap ml-10 mr-10">
                {channels.map((channel) => (
                    <li
                        key={channel.channelID}
                        className="flex flex-col w-96 p-4 m-2 bg-gray-700 rounded-md">
                        <div className="grid grid-row-3 grid-flow-col gap-4">
                            <div className="row-span-3">
                                <Link
                                    to={`/Channel/${channel.channelID}`}
                                    title={`${channel.name}のアーカイブ`}>
                                    <IconElement
                                        src={`${iconURL}${channel.channelIconID}`}
                                        alt={`${channel.name}のチャンネルアイコン`}
                                        size="Medium"
                                        radius="full"
                                    />
                                </Link>
                            </div>
                            <div className="row-span-1 col-span-2 mt-4 flex flex-col inline-block justify-center items-center \">
                                <Link
                                    to={`/Channel/${channel.channelID}`}
                                    title={`${channel.name}のアーカイブ`}>
                                    <div className="flex flex-col">
                                        <span className="text-gray-100 font-sans text-lg">
                                            {channel.name}
                                        </span>
                                        <span className="text-gray-400 font-sans text-sm">
                                            Channel Name
                                        </span>
                                    </div>
                                </Link>
                                <span className="text-gray-400 font-sans text-xs">
                                    Since 2013/8/24
                                </span>
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
