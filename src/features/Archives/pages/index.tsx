import React, { Suspense } from 'react';

import { useRouter } from 'next/router';

import NextLoad from '../component/NextLoad';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives, usePage } from '../hook/useArchive';

// import { Error } from '@/src/component/Error';

export const ArchiveRouter = () => {
    const router = useRouter();

    //String[] or Stringなので、配列を除外しStringに型を定める
    const query = Array.isArray(router.query.channelId)
        ? router.query.channelId[0]
        : router.query.channelId;

    const Archives = useArchives(query);
    const [loadNextList] = usePage();

    const onHandler = () => {
        router.push({
            pathname: '/',
        });
    };

    // if (Archives.length === 0 && error)
    //     return <Error status={error.status} message={error.message} />;
    return (
        <div className="bg-gray-800 flex justify-center content-center">
            {/* {isError() && <div>Error</div>} */}
            <div>
                <button onClick={() => onHandler()}>戻る</button>
            </div>
            <div className="w-full md:w-1/2">
                <ArchiveList Archives={[...Archives.archives]} />
            </div>
            <div>
                <button onClick={() => loadNextList(query)}>Next</button>
            </div>
        </div>
    );
};
