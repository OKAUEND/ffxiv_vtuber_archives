import React, { Suspense } from 'react';

import { useArchives } from '../api/getYoutube';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import NextLoad from '../component/NextLoad';
import { ArchiveList } from '../component/ArchiveList';

import { Hover } from '../../../component/Element/Button';
import { LeftArrow } from '../../../component/Element/Icon';
import { VtuberDetail } from '../types';
import { Channel } from '../component/Channel';

const typeGuard = (target: string | undefined) => {
    if (target === undefined) {
        return 'error';
    }
    return target;
};

interface LocationState {
    channel: VtuberDetail;
}

export const Archive = () => {
    const { channelID } = useParams<'channelID'>();
    //TypeGuardでundefinedを除外する
    const targetChannelID = typeGuard(channelID);
    const [Archives] = useArchives(targetChannelID);
    const location = useLocation();
    const locationState = location.state as LocationState;
    const navigate = useNavigate();

    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

    return (
        <div className="flex flex-col">
            <div className="flex justify-start">
                <Hover handler={() => navigate(-1)} size="small" radius="full">
                    <div className="text-gray-100">
                        <LeftArrow />
                    </div>
                </Hover>
            </div>
            <article className="grid place-content-center">
                <h1 className="sr-only">{`${locationState.channel.name}のコミュニティリンク`}</h1>
                <Channel channelDetail={locationState.channel}></Channel>
            </article>
            <article>
                <h1 className="sr-only">{`${locationState.channel.name}のアーカイブ`}</h1>
                <ArchiveList Archives={Archives} />
            </article>
            <div className="mt-2 mb-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad channelId={targetChannelID} />
                </Suspense>
            </div>
        </div>
    );
};
