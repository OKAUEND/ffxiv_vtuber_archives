import React, { Suspense, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

export const Channels = () => {
    return (
        <div>
            <div>
                <RecoilRoot>
                    <Suspense fallback={<p>Loading...</p>}>
                        <ChannelPanel />
                    </Suspense>
                </RecoilRoot>
            </div>
        </div>
    );
};
