import { testApiHandler } from 'next-test-api-route-handler';
import { describe, expect, test } from 'vitest';

import { channelPostHandler } from '@/src/features/Channels/mock';

import { handler } from '@/src/features/Channels/api/channel';
import { handlers } from '@/src/mock/handlers';
import { setupMockServer } from '@/src/mock/test/setup';

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
    test('Atom - ArchivesAtomFamilyに対してID毎に配列を追加できるか', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourceFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test')).valueOrThrow()
        ).toEqual([YoutubeResourceFactory('test')]);
    });
    test('Atom - 別IDを指定した時、追加した内容が出ていないこと', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourceFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test2')).valueOrThrow()
        ).not.toEqual([YoutubeResourceFactory('test')]);
    });

    test('クエリ作成関数をコールしたら、APIをコールし値を取得できるか', async () => {
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
        //     //初期はクエリがなにもないので空配列が帰ってくる事
        //     expect(response.length).toBe(0);
        //     setQuery();
        //     expect(mock).toHaveBeenCalledTimes(1);
        // });
    });
    test('APIをコールし値をキャッシュした後、再発動防止のためにクエリを消去しているか', async () => {
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
        //     //初期取得で値が取得されている
        //     expect(response).toBe([testData.items]);
        //     setQuery();
        //     //次に取得したときに、キャッシュされているデータが増えているか
        //     expect(response).toBe([...testData.items, ...testData.items]);
        // });
    });
});

describe('useArchives TEST', () => {
    test('初期値の何も格納がされていない場合は、APIをコールし初期値を取得すること', async () => {
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
    test('キャッシュしている値があるなら、APIコールをせずにキャッシュされている値を使う', async () => {
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
