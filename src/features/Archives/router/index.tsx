import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Archive } from './Archive';

export const Archives = () => {
    return (
        <RecoilRoot>
            <Suspense fallback={<p>Loading...</p>}>
                <Archive />
            </Suspense>
        </RecoilRoot>
    );
};
