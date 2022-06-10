import { renderHook } from '@testing-library/react-hooks';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
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

    test('クエリ作成関数をコールしたら、APIをコールし値を取得できるか', async () => {
        const mock = jest
            .spyOn(AxiosInstanceModule, 'get')
            .mockImplementationOnce(() => {
                return Promise.resolve(
                    AxiosStatusFactory(200, true, GoogleYoutubeFactory('test'))
                );
            });

        expect(mock).toHaveBeenCalledTimes(0);

        const { result } = renderHook(() => useYoutube('testchannel'), {
            wrapper: RecoilRoot,
        });

        await waitFor(() => {
            const [response, setQuery] = result.current;

            //初期はクエリがなにもないので空配列が帰ってくる事
            expect(response.length).toBe(0);

            setQuery();

            expect(mock).toHaveBeenCalledTimes(1);
        });
    });
});
