import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

import { useChannels } from '../hook/useChannel';

export const Channels = () => {
    // const [channels, resultStatus, reload] = useChannels();
    const [channels] = useChannels();
    return (
        <div>
            <ChannelPanel channels={channels} />{' '}
        </div>
    );
};
