import React, { Suspense } from 'react';

import { ArchiveList } from '../component/ArchiveList';
import NextLoad from '../component/NextLoad';
import { useArchives } from '../hook/useArchives';
import { useTimeRange } from '../hook/useTimeRange';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

type Props = {
    channelId: string;
};

export const Archive = (props: Props) => {
    const [channelId, setChannelId] = useState('');
    const [Archives, lastArchivesDayTime, addArchives, exists] =
        useArchives(channelId);
    const [timeRange, createTimeRange] = useTimeRange(exists());

    const [isBeforeFirstDayTime] = useFirstLiveDayTime('20200101');

    const onClick = () => {
        const lastDayTime = lastArchivesDayTime();
        if (isBeforeFirstDayTime(lastDayTime)) return;
        createTimeRange(lastDayTime);
    };

    useEffect(() => {
        if (exists()) return;
        const realTime = new Date().toISOString();
        createTimeRange(realTime);
    }, [channelId]);
    const storeArchives = (
        youtubeArchives: GoogleApiYouTubeSearchResource[]
    ) => {
        addArchives(youtubeArchives);
    };
    return (
        <div>
            <div>
                <ArchiveList Archives={Archives} />
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad
                        channelId={channelId}
                        timeRange={timeRange}
                        isEnabled={true}
                        onClick={onClick}
                        store={storeArchives}
                    />
                </Suspense>
            </div>
        </div>
    );
};
