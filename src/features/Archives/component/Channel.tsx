import React from 'react';
import { IconElement } from 'component/Element/Image';
import { VtuberDetail } from '../types';

const iconURL = import.meta.env.VITE_YOUTUBE_CHANNEL_ICON_URL;

export const Channel = (channelDetail: VtuberDetail) => {
    return (
        <div>
            <IconElement
                src={`${iconURL}${channelDetail.channelIconID}`}
                size="Medium"
                radius="full"></IconElement>
            <span>{channelDetail.channelName}</span>
            {channelDetail.twitter}
            {channelDetail.channelID}
            {channelDetail.twitch}
        </div>
    );
};
