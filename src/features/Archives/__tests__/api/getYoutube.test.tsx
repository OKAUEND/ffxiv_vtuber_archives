import { act, renderHook } from '@testing-library/react-hooks';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import * as AxiosInstanceModule from '../../../../utility/axios/index';
import { AxiosStatusFactory } from '../../../../utility/test/AxiosResult';
import {
    useYoutube,
    useArchives,
    archivesAtom,
    requestQueryAtom,
} from '../../api/getYoutube';

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

const YoutubeResourceFactory = (
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

describe('getYoutube Custom Hook TEST', () => {
    test('Atom - ArchivesAtomFamily????????????ID?????????????????????????????????', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourceFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test')).valueOrThrow()
        ).toEqual([YoutubeResourceFactory('test')]);
    });
    test('Atom - ???ID???????????????????????????????????????????????????????????????', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourceFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test2')).valueOrThrow()
        ).not.toEqual([YoutubeResourceFactory('test')]);
    });

    test('?????????????????????????????????????????????API???????????????????????????????????????', async () => {
        // const mock = jest
        //     .spyOn(AxiosInstanceModule, 'get')
        //     .mockImplementationOnce(() => {
        //         return Promise.resolve(
        //             AxiosStatusFactory(200, true, GoogleYoutubeFactory('test'))
        //         );
        //     });
        // expect(mock).toHaveBeenCalledTimes(0);
        // const { result } = renderHook(() => useYoutube('testchannel'), {
        //     wrapper: RecoilRoot,
        // });
        // await waitFor(() => {
        //     const [response, setQuery] = result.current;
        //     //????????????????????????????????????????????????????????????????????????
        //     expect(response.length).toBe(0);
        //     setQuery();
        //     expect(mock).toHaveBeenCalledTimes(1);
        // });
    });
    test('API????????????????????????????????????????????????????????????????????????????????????????????????????????????', async () => {
        // const initRecoilSnapShot = snapshot_UNSTABLE();
        // expect(
        //     initRecoilSnapShot.getLoadable(requestQueryAtom).valueOrThrow()
        // ).toEqual('');
        // const testData = GoogleYoutubeFactory('test');
        // const mock = jest
        //     .spyOn(AxiosInstanceModule, 'get')
        //     .mockImplementationOnce(() => {
        //         return Promise.resolve(AxiosStatusFactory(200, true, testData));
        //     });
        // expect(mock).toHaveBeenCalledTimes(0);
        // const { result } = renderHook(() => useYoutube('testchannel'), {
        //     wrapper: RecoilRoot,
        // });
        // await waitFor(() => {
        //     const [response, setQuery] = result.current;
        //     //??????????????????????????????????????????
        //     expect(response).toBe([testData.items]);
        //     setQuery();
        //     //??????????????????????????????????????????????????????????????????????????????????????????
        //     expect(response).toBe([...testData.items, ...testData.items]);
        // });
    });
});

describe('useArchives TEST', () => {
    test('?????????????????????????????????????????????????????????API?????????????????????????????????????????????', async () => {
        // const testData = GoogleYoutubeFactory('test');
        // const mock = jest
        //     .spyOn(AxiosInstanceModule, 'get')
        //     .mockImplementationOnce(() => {
        //         return Promise.resolve(AxiosStatusFactory(200, true, testData));
        //     });
        // const { result } = renderHook(() => useArchives('testchannel'), {
        //     wrapper: RecoilRoot,
        // });
        // await waitFor(() => {
        //     const [response] = result.current;
        //     expect(mock).toHaveBeenCalledTimes(1);
        //     expect(response).toEqual([testData.items]);
        // });
    });
    test('????????????????????????????????????????????????API???????????????????????????????????????????????????????????????', async () => {
        // const testData = YoutubeResourceFactory('test');
        // const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
        //     set(archivesAtom('testchannel'), [testData]);
        // });
        // expect(
        //     initRecoilSnapShot
        //         .getLoadable(archivesAtom('testchannel'))
        //         .valueOrThrow()
        // ).toEqual([testData]);
        // const mock = jest
        //     .spyOn(AxiosInstanceModule, 'get')
        //     .mockImplementationOnce(() => {
        //         return Promise.resolve(AxiosStatusFactory(200, true, testData));
        //     });
        // const { result } = renderHook(() => useArchives('testchannel'), {
        //     wrapper: RecoilRoot,
        // });
        // await waitFor(() => {
        //     const [response] = result.current;
        //     expect(mock).toHaveBeenCalledTimes(0);
        //     expect(response).toEqual([testData]);
        // });
    });
});
