import React from 'react';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../api/getYoutube';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

interface Props {
    name: string;
    channelId: string;
}

export const Archive = ({ name, channelId }: Props) => {
    const [Archives] = useArchives(channelId);

    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

    return (
        <article>
            <h1 className="">{`${name}のアーカイブ`}</h1>
            <ArchiveList Archives={Archives} />
        </article>
    );
};
