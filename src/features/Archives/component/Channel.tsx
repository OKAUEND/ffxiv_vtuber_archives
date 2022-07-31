import React from 'react';
import { IconElement } from 'component/Element/Image';
import { VtuberDetail } from '../types';

import { Twitter, Youtube, Twitch } from '../../../component/Element/Icon';
const iconURL = import.meta.env.VITE_YOUTUBE_CHANNEL_ICON_URL;

export const Channel = (channelDetail: VtuberDetail) => {
    return (
        <div>
            <IconElement
                src={`${iconURL}${channelDetail.channelIconID}`}
                size="Medium"
                radius="full"></IconElement>
            <span>{channelDetail.channelName}</span>
            <a href={channelDetail.twitter}>
                <Twitter />
            </a>
            <a href={channelDetail.channelID}>
                <Youtube />
            </a>
            <a href={channelDetail.twitch}>
                <Twitch />
            </a>
        </div>
    );
};
