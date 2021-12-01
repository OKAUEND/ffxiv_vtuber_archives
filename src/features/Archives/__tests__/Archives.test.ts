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

import * as ArchivesAPIModule from '../api/getArchives';

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

describe('Archives TEST', () => {
    let getSpy: jest.SpyInstance<
        Promise<GoogleApiYouTubeSearchResource[]>,
        [channelId: string, TimeRange: { EndTime: string; BeginTime: string }]
    >;

    beforeEach(async () => {
        getSpy = jest.spyOn(ArchivesAPIModule, 'fetchYoutube');
    });

    afterEach(() => {
        getSpy.mockRestore();
    });

    test('対象の時間が基準の時間より大きい場合は真を返す', () => {
        const targetTime = new Date(2021, 12, 3);
        const BeginTime = new Date(2021, 12, 7);
        const result = isPeriod(targetTime, BeginTime);
        expect(result).toEqual(true);
    });
    test('一時キャッシュを目的としたMapオブジェクトに、値をSetできるか', () => {
        const testData = YoutubeResourcesFactory('test');
        setArchives('test', [testData]);
        const result = getArchives('test');
        expect(result).toEqual([testData]);
    });

    test('キャッシュを上書きできるか', () => {
        const testData = YoutubeResourcesFactory('test');
        setArchives('test', [testData]);
        const newData = YoutubeResourcesFactory('test2');
        setArchives('test', [newData]);
        const result = getArchives('test');

        expect(result).toEqual([newData]);
    });

    test('モック化できている？', async () => {
        getSpy.mockImplementationOnce(() =>
            Promise.resolve([YoutubeResourcesFactory('mock2')])
        );
        const targetTime = new Date(2021, 12, 3);
        const BeginTime = new Date(2021, 12, 7);
        const time: timeRangetype = {
            EndTime: targetTime.toISOString(),
            BeginTime: BeginTime.toISOString(),
        };
        const test = await ArchivesAPIModule.fetchYoutube('mock', time);
        expect(test).toStrictEqual([YoutubeResourcesFactory('mock2')]);
    });
});

describe('Archives Recoil TEST', () => {
    test('Atom - ChannelIdを取得できるか', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE();
        expect(
            initRecoilSnapShot.getLoadable(currentChannelIDState).valueOrThrow()
        ).toBe('UC6oDys1BGgBsIC3WhG1BovQ');
    });
});
