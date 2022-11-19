import React, { Suspense } from 'react';

import link from 'next/link';

import NextLoad from '../component/NextLoad';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../hook/useArchive';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

const typeGuard = (target: string | undefined) => {
    if (target === undefined) {
        return 'error';
    }
    return target;
};

export const ArchiveRouter = () => {
    // const { channelID } = useParams<'channelID'>();
    // const navigate = useNavigate();

    //TypeGuardでundefinedを除外する
    // const targetChannelID = typeGuard(channelID);

    const [Archives] = useArchives('channelId');

    return (
        <div>
            <div>
                {/* <button onClick={() => navigate(-1)}>戻る</button> */}
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <ArchiveList Archives={Archives} />
                </Suspense>
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad handler={() => {}} />
                </Suspense>
            </div>
        </div>
    );
};
