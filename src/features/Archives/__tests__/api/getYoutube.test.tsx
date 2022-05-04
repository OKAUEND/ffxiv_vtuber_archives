import axios from 'axios';
import React from 'react';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import * as AxiosInstanceModule from '../../../../utility/axios/index';
import { AxiosStatusFactory } from '../../../../utility/test/AxiosResult';
import { useYoutube } from '../../api/getYoutube';
import { waitFor } from '@testing-library/react';

const GoogleYoutubeFactory = (
    name: string
): GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource> => {
    return {
        kind: name,
        etag: name,
        items: [
            {
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
            },
        ],
    };
};

describe('getYoutube Custom Hook TEST', () => {
    test('クエリ作成関数をコールしたら、APIをコールし値を取得できるか', async () => {
        const mock = jest
            .spyOn(AxiosInstanceModule, 'get')
            .mockImplementationOnce(() => {
                return Promise.resolve(
                    AxiosStatusFactory(200, true, GoogleYoutubeFactory('test'))
                );
            });

        expect(mock).toHaveBeenCalledTimes(0);

        const { result } = renderHook(() => useYoutube(), {
            wrapper: RecoilRoot,
        });

        await waitFor(() => {
            const [, setQuery] = result.current;

            setQuery('testchannel', '202001', '202002');

            expect(mock).toHaveBeenCalledTimes(1);
        });
    });
});
