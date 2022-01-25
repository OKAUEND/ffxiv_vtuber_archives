import { useRecoilValue, snapshot_UNSTABLE } from 'recoil';
import {
    getArchives,
    setArchives,
    useArchives,
    isPeriod,
    currentChannelIDState,
    timeRangeState,
    timeRangetype,
} from '../api/getArchives';

import { archivesAtom } from '../hook/useArchives';

const YoutubeResourcesFactory = (
    name: string
): GoogleApiYouTubeSearchResource => {
    return {
        kind: name,
        etag: name,
        id: {
            kind: name,
            videoId: name,
            channelId: name,
            playlistId: name,
        },
        snippet: {
            publishedAt: name,
            channelId: name,
            title: name,
            description: name,
            thumbnails: {
                default: {
                    url: name,
                    width: 99,
                    height: 99,
                },
                high: {
                    url: name,
                    width: 99,
                    height: 99,
                },
                medium: {
                    url: name,
                    width: 99,
                    height: 99,
                },
            },
            channelTitle: name,
        },
    };
};

// describe('Archives TEST', () => {});

describe('Archives Recoil TEST', () => {
    test('Atom - ArchivesAtomFamilyに対してID毎に配列を追加できるか', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourcesFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test')).valueOrThrow()
        ).toEqual([YoutubeResourcesFactory('test')]);
    });
    test('Atom - 別IDを指定した時、追加した内容が出ていないこと', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourcesFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test2')).valueOrThrow()
        ).not.toEqual([YoutubeResourcesFactory('test')]);
    });
});
