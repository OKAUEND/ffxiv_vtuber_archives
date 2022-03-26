import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import { useChannels } from '../../api/getChannels';
import { useTimeOutError } from '../../../../hooks/timeout/index';
// interface IProps {
//     Channels: string[];
// }

export const ChannelPanel = () => {
    const { channelId } = useParams();
    const [channels, loadData] = useChannels();
    const [isTimeOut] = useTimeOutError(channels);

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
                <button onClick={loadData}>再度読み込む</button>
            </div>
        );
    };
    return (
        // <ul>
        //     {Channels.map((channel) => (
        //         //まだ受け渡すオブジェクトの構造ができあがっていないので、
        //         //仮コード
        //         <li key={channel}>
        //             <div>
        //                 <img src="" />
        //                 {
        //                     //チャンネル名
        //                 }
        //             </div>
        //         </li>
        //     ))}
        // </ul>
        <h2>TEST {channelId}</h2>
    );

    {
        /* 
        Timeoutした場合はこの下のTimeout処理をかく 
        理由：サイドリロードさせたいので
        */
    }
};
