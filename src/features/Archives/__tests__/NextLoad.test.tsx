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
        const onNextLoad = jest.fn();
        render(
            <RecoilRoot>
                <React.Suspense fallback={<p>Loading...</p>}>
                    <NextLoad onNextLoad={onNextLoad} />
                </React.Suspense>
            </RecoilRoot>
        );
        await waitFor(() => {
            screen.debug();
            expect(screen.getByRole('button')).toBeInTheDocument();
        });
    });
    test('ボタンをクリックしたらイベントが発火するか', async () => {
        const onNextLoad = jest.fn();
        const { getByRole, getByText } = render(
            <RecoilRoot>
                <React.Suspense fallback={<p>Loading...</p>}>
                    <NextLoad onNextLoad={onNextLoad} />
                </React.Suspense>
            </RecoilRoot>
        );
        await waitFor(() => {
            fireEvent.click(getByRole('button'));
            expect(onNextLoad).toHaveBeenCalled();
        });
    });
});
