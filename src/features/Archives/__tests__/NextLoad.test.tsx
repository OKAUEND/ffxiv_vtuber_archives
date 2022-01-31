import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import NextLoad from '../component/NextLoad';

import * as getYoutubeModule from '../api/getYoutube';
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
describe('Component TEST - NextLoad', () => {
    const spy = jest
        .spyOn(getYoutubeModule, 'useYoutube')
        .mockImplementation(() => [YoutubeResourcesFactory('Mock')]);

    afterEach(() => {
        spy.mockRestore();
    });
    test('ボタンが表示されているか', async () => {
    });
    test('ボタンをクリックしたらイベントが発火するか', () => {});
    test('次の取得期間が初放送日以前の時間になった場合、下限が初放送日になっているか', () => {});
    test('起点日が初放送日以前の時間になった場合、期間の更新を行わない', () => {});
});
