import React from 'react';
import {} from 'react';
import {
    useArchives,
    currentChannelIDState,
    channelArchivesState,
    timeRangeState,
} from '../api/getArchives';

import {
    useRecoilValue,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
} from 'recoil';

import { Archives as ArchivesList } from '../component/Archives';

import { Archives as ActiveType } from '../types';

export const Archives = () => {
    const channelArchives = useRecoilValue(useArchives);
    const [currentChannelState, setChannelID] = useRecoilState(
        currentChannelIDState
    );
    const [timeRange, setTimeRange] = useRecoilState(timeRangeState);

    return (
        <div>
            <ArchivesList archives={channelArchives}></ArchivesList>
        </div>
    );
};
