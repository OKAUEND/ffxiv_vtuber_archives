import * as React from 'react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';

import * as getChannelsModule from '../../api/getChannels';
import * as useTimeOutModule from '../../../../hooks/timeout/index';
import { HikasenVtuber } from '../../types/index';
import { AxiosResut } from '../../../../types/api/index';
import ChannelPanel from '../../component/ChannelPanel';

const HikasenVtuberResourceFactory = (name: string): HikasenVtuber => {
    return {
        channelID: name,
        channelIconID: name,
        name: name,
        twitter: '',
        twitch: '',
        ffxiv: {
            dataCenter: 'test',
            server: 'test',
        },
    };
};

const AxiosStatusFactory = (
    status: number,
    isSuccess: boolean,
    HikasenVtuber: HikasenVtuber[]
): AxiosResut<HikasenVtuber[]> => {
    const errorCode = () => {
        if (status === 408) {
            return 'ECONNABORTED';
        }
        return 'TEST';
    };

    return {
        status: status,
        errorCode: errorCode(),
        error: isSuccess,
        payload: HikasenVtuber,
    };
};
describe('channel Panel - コンポーネントテスト', () => {
    const HikasenVtuber = HikasenVtuberResourceFactory('test');

    test('', () => {
        jest.spyOn(getChannelsModule, 'useChannels').mockImplementation(() => [
            [HikasenVtuber],
            AxiosStatusFactory(200, true, [HikasenVtuber]),
            jest.fn(),
        ]);

        jest.spyOn(useTimeOutModule, 'useTimeOutError').mockImplementation(
            () => [true]
        );

        const { getByText, getByRole } = render(
            <RecoilRoot>
                <ChannelPanel />
            </RecoilRoot>
        );
        // expect(screen.getByRole('img')).not.toBeInTheDocument();
        expect(screen.getByText('タイムアウトエラー')).toBeInTheDocument();
    });
});
