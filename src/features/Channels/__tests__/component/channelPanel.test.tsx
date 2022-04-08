import * as React from 'react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import {
    act,
    fireEvent,
    getByRole,
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

    test('通信が正常値を返した場合、成功した場合の画面を出力できているか', () => {
        jest.spyOn(getChannelsModule, 'useChannels').mockImplementation(() => [
            [HikasenVtuber],
            AxiosStatusFactory(200, true, [HikasenVtuber]),
            jest.fn(),
        ]);

        jest.spyOn(useTimeOutModule, 'useTimeOutError').mockImplementation(
            () => [false]
        );

        render(
            <RecoilRoot>
                <ChannelPanel />
            </RecoilRoot>
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(
            screen.queryByText('タイムアウトエラー')
        ).not.toBeInTheDocument();
    });

    test('タイムアウトエラーの場合、タイムアウトエラー画面が表示されるか', () => {
        jest.spyOn(getChannelsModule, 'useChannels').mockImplementation(() => [
            [HikasenVtuber],
            AxiosStatusFactory(408, false, [HikasenVtuber]),
            jest.fn(),
        ]);

        jest.spyOn(useTimeOutModule, 'useTimeOutError').mockImplementation(
            () => [true]
        );

        render(
            <RecoilRoot>
                <ChannelPanel />
            </RecoilRoot>
        );

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('タイムアウトエラー')).toBeInTheDocument();
    });

    test('タイムアウトエラーの場合、ボタンのイベントを発火する事ができるか', () => {
        const mockFunction = jest.fn();

        jest.spyOn(getChannelsModule, 'useChannels').mockImplementation(() => [
            [HikasenVtuber],
            AxiosStatusFactory(408, false, [HikasenVtuber]),
            mockFunction,
        ]);

        jest.spyOn(useTimeOutModule, 'useTimeOutError').mockImplementation(
            () => [true]
        );

        render(
            <RecoilRoot>
                <ChannelPanel />
            </RecoilRoot>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(mockFunction).toHaveBeenCalled();
    });
});
