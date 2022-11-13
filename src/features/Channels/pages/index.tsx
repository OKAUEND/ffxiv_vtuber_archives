import React, { Suspense, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

export const Channels = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <ChannelPanel />
            </Suspense>
        </div>
    );
};
