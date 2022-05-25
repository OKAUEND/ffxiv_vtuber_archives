import React, { Suspense, useEffect, useState } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../api/getYoutube';
import { useTimeRange } from '../hook/useTimeRange';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

import { useNavigate, useParams } from 'react-router-dom';

interface Props {
    channelId: string;
}

export const Archive = ({ channelId }: Props) => {
    const [Archives] = useArchives(channelId);

    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

    return (
        <div>
            <div>
                <ArchiveList Archives={Archives} />
            </div>
        </div>
    );
};
