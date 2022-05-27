import React from 'react';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../api/getYoutube';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

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
