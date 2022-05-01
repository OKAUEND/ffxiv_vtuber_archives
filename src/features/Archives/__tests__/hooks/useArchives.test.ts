import { act } from '@testing-library/react-hooks';
import { useRecoilValue } from 'recoil';
import { useArchives, archivesAtom } from '../../hook/useArchives';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';

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

const useMock = () => {
    const [, , addArchives, exists] = useArchives('testchannel');
    const ArchiveAtom = useRecoilValue(archivesAtom('testchannel'));
    return { addArchives, exists, ArchiveAtom };
};
describe('useArchives TEST', () => {
    test('初期値の何も格納がされていない配列であること', () => {
        const { result } = renderHook(() => useArchives('testChannel'));
        const [target] = result.current;
        expect(target).toEqual([]);
    });
    test('addArchivesへ新しい配列を渡すと、その値を保存するか', () => {
        const { result } = renderHook(() => useArchives('testChannel'));
        const [target, , addArchives] = result.current;
        expect(target).toEqual([]);

        const testData = YoutubeResourcesFactory('test');

        act(() => {
            addArchives([testData]);
        });

        expect(target).toEqual([testData]);
    });

    test('existsでは、値の有無で真偽値が返ってくるか', () => {
        const { result } = renderHook(() => useArchives('testChannel'));
        const [target, , addArchives, exists] = result.current;
        expect(target).toEqual([]);
        expect(exists).toEqual(false);

        const testData = YoutubeResourcesFactory('test');

        act(() => {
            addArchives([testData]);
        });

        expect(exists).toEqual(true);
    });
});
