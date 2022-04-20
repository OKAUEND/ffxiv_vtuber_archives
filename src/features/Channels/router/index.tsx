import React, { Suspense, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { Route, Routes, Link, useParams } from 'react-router-dom';
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
