import React, { Suspense, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

import { useChannels } from '../hook/useChannel';

export const Channels = () => {
    // const [channels, resultStatus, reload] = useChannels();
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                {/* <ChannelPanel /> */}
                <p>Loading...</p>
            </Suspense>
        </div>
    );
};
