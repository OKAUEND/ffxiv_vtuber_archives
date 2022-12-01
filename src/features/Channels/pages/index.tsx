import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

import { useChannels } from '../hook/useChannel';
import { HikasenVtuber } from '../types';

type Props = {
    ChannelsFirstPagenation: HikasenVtuber[];
};

export const Channels = ({ ChannelsFirstPagenation }: Props) => {
    // const [channels, resultStatus, reload] = useChannels();
    const [channels] = useChannels(ChannelsFirstPagenation);
    return (
        <div>
            <ChannelPanel channels={channels} />
        </div>
    );
};
