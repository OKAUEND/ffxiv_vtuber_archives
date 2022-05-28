import React from 'react';
import { useChannels } from '../../api/getChannels';
import { useTimeOutError } from '../../../../hooks/timeout/index';
import { Link } from 'react-router-dom';
export const ChannelPanel = () => {
    const [channels, resultStatus, reload] = useChannels();
    const [isTimeOut] = useTimeOutError(resultStatus);

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
                    //まだ受け渡すオブジェクトの構造ができあがっていないので、
                    //仮コード
                    <li key={channel.channelID}>
                        <div>
                            <Link to={`/Channel/${channel.channelID}`}>
                                <img src={channel.channelIconID} />
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
