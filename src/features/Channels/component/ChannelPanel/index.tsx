import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import { useChannels } from '../../api/getChannels';
import { useTimeOutError } from '../../../../hooks/timeout/index';
// interface IProps {
//     Channels: string[];
// }

export const ChannelPanel = () => {
    const { channelId } = useParams();
    const [channels, resultStatus, loadData] = useChannels();
    const [isTimeOut] = useTimeOutError(resultStatus);

    {
        /* 
        Timeoutした場合はこの下のTimeout処理をかく 
        理由：サイドリロードさせたいので
        */
    }
    const timeOutError = () => {
        <div>
            <h3>タイムアウトエラー</h3>
            <button onClick={loadData}>再度読み込む</button>
        </div>;
    };

    const success = () => {
        <ul>
            {channels.map((channel) => (
                //まだ受け渡すオブジェクトの構造ができあがっていないので、
                //仮コード
                <li key={channel.channelID}>
                    <div>
                        <img src={channel.channelIconID} />
                        {channel.name}
                    </div>
                </li>
            ))}
        </ul>;
    };

    return <div>{isTimeOut ? timeOutError : success}</div>;
};
