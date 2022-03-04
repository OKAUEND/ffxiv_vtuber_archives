import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, useParams } from 'react-router-dom';

// interface IProps {
//     Channels: string[];
// }

export const ChannelPanel = () => {
    const { channelId } = useParams();
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
};
