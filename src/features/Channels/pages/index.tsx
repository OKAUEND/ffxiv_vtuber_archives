import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

import { useChannels } from '../hook/useChannel';
import { HikasenVtuber } from '../types';

import { useRouter } from 'next/router';

type Props = {
    ChannelsFirstPagenation: HikasenVtuber[];
};

export const Channels = ({ ChannelsFirstPagenation }: Props) => {
    // const [channels, resultStatus, reload] = useChannels();
    const [channels] = useChannels(ChannelsFirstPagenation);
    const router = useRouter();

    const onhandler = () => {
        router.push({
            pathname: '/Archives/hogehoge',
        });
    };

    return (
        <ChannelPanel
            channels={ChannelsFirstPagenation}
            onhandler={onhandler}
        />
    );
};
