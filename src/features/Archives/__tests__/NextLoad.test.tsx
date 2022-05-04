import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import * as React from 'react';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import NextLoad from '../component/NextLoad';
import { timeRangetype } from '../types/index';

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
            publishedAt: '20200101',
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

interface Props {
    channelId: string;
    timeRange: timeRangetype;
    isEnabled: boolean;
    onClick: () => void;
    store: (youtubeArchives: GoogleApiYouTubeSearchResource[]) => void;
}

const renderNextLoad = (props: Partial<Props> = {}) => {
    const defultProps: Props = {
        channelId: '',
        timeRange: { BeginTime: '', EndTime: '' },
        isEnabled: true,
        onClick() {
            return;
        },
        store() {
            return;
        },
    };

    return render(
        <RecoilRoot>
            <React.Suspense fallback={<p>Loading...</p>}>
                <NextLoad {...defultProps} {...props} />
            </React.Suspense>
        </RecoilRoot>
    );
};

describe('Component TEST - NextLoad', () => {
    test('ボタンが表示されているか', async () => {
        const spy = jest
            .spyOn(getYoutubeModule, 'useYoutube')
            .mockImplementation(() => {
                return [[YoutubeResourcesFactory('Mock')], jest.fn()];
            });

        renderNextLoad();
        await waitFor(() => {
            expect(screen.getByRole('button')).toBeInTheDocument();
            spy.mockRestore();
        });
    });
    test('ボタンをクリックしたらイベントが発火するか', async () => {
        const spy = jest
            .spyOn(getYoutubeModule, 'useYoutube')
            .mockImplementation(() => {
                return [[YoutubeResourcesFactory('Mock')], jest.fn()];
            });

        const onClick = jest.fn();
        const { getByRole, getByText } = renderNextLoad({ onClick });
        await waitFor(() => {
            fireEvent.click(getByRole('button'));
            expect(onClick).toHaveBeenCalled();
            spy.mockRestore();
        });
    });
    test('isEnableがfalseのとき、ボタンは非表示になっているか', async () => {
        const spy = jest
            .spyOn(getYoutubeModule, 'useYoutube')
            .mockImplementation(() => {
                return [[YoutubeResourcesFactory('Mock')], jest.fn()];
            });

        renderNextLoad({ isEnabled: false });
        await waitFor(() => {
            expect(screen.getByRole('button')).not.toBeInTheDocument();
        });
    });
});
