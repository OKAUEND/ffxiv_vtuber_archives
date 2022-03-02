import React, { Suspense, useEffect, useState } from 'react';

interface IProps {
    Channels: string[];
}

export const ChannelPanel = ({ Channels }: IProps) => {
    return (
        <ul>
            {Channels.map((channel) => (
                //まだ受け渡すオブジェクトの構造ができあがっていないので、
                //仮コード
                <li key={channel}>
                    <div>
                        <img src="" />
                        {
                            //チャンネル名
                        }
                    </div>
                </li>
            ))}
        </ul>
    );
};
