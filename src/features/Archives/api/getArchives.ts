import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { Archives } from '../types';

type timeRangeState = {
    EndTime: string;
    BeginTime: string;
};

type cacheArchives = {
    channelId: string;
    archives?: Pick<
        GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>,
        'items'
    >;
};
