import React from 'react';
import { IconElement } from 'component/Element/Image';
import { VtuberDetail } from '../types';

import { Twitter, Youtube, Twitch } from '../../../component/Element/Icon';
const iconURL = import.meta.env.VITE_YOUTUBE_CHANNEL_ICON_URL;

interface IProps {
    channelDetail: VtuberDetail;
}

export const Channel = ({ channelDetail }: IProps) => {
    return (
        <div>
            <IconElement
                src={`${iconURL}${channelDetail.channelIconID}`}
                size="Medium"
                radius="full"></IconElement>
            <span>{channelDetail.channelName}</span>
            {channelDetail.twitter != '' && (
                <a href={channelDetail.twitter}>
                    <Twitter />
                </a>
            )}
            {/**
             * Youtubeのチャンネルが存在しないは、対象配信者となりえないので、
             * Youtubeのリンクは常に表示させる
             */}
            <a href={channelDetail.channelID}>
                <Youtube />
            </a>
            {channelDetail.twitch != '' && (
                <a href={channelDetail.twitch}>
                    <Twitch />
                </a>
            )}
        </div>
    );
};
