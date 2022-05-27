import React, { Suspense } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Archive } from './Archive';
import NextLoad from '../component/NextLoad';

const typeGuard = (target: string | undefined) => {
    if (target === undefined) {
        return 'error';
    }
    return target;
};

export const ArchiveRouter = () => {
    const { channelID } = useParams<'channelID'>();
    const navigate = useNavigate();

    //TypeGuardでundefinedを除外する
    const targetChannelID = typeGuard(channelID);

    return (
        <div>
            <div>
                <button onClick={() => navigate(-1)}>戻る</button>
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <Archive channelId={targetChannelID} />
                </Suspense>
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad channelId={targetChannelID} />
                </Suspense>
            </div>
        </div>
    );
};
