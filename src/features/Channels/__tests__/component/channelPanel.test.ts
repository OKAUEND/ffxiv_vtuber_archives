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


describe('channel Panel - コンポーネントテスト', () => {
    test('', () => {});
});
