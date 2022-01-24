import React, { useEffect } from 'react';

import {
    useRecoilValue,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
} from 'recoil';
export const NextLoad = () => {
    const setNextLoadTimeRange = () => {
    };
    return (
        <div>
            <button onClick={setNextLoadTimeRange}>次をロード</button>
        </div>
    );
};
