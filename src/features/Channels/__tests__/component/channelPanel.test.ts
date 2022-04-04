import * as React from 'react';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { ChannelPanel } from '../../component/ChannelPanel';
import { useChannels } from '../../api/getChannels';
import { useTimeOutError } from '../../../../hooks/timeout/index';
import { Channels } from 'features/Channels/router';

import * as getChannelsModule from '../../api/getChannels';
import { HikasenVtuber } from '../..//types/index';
import { AxiosResut } from '../../../../types/api/index';
jest.mock('useChannels', () => ({
    useChannels() {
        return {};
    },
}));

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
        const useChannelsSpy = jest
            .spyOn(getChannelsModule, 'useChannels')
            .mockImplementation(() => [
                [HikasenVtuber],
                AxiosStatusFactory(200, true, [HikasenVtuber]),
                jest.fn(),
            ]);
    });
});
