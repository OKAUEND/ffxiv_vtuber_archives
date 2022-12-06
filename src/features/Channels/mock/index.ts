import { rest } from 'msw';
import { HikasenVtuber } from '../types';

type Data = {
    data: HikasenVtuber[];
};

type Error = {
    message: string;
    status: number;
};
const HOST = process.env.NEXT_PUBLIC_HOST;

const path = () => `${HOST}/api/channel`;

const channnel: HikasenVtuber = {
    channelID: 'test',
    channelIconID: 'test',
    name: 'test',
    twitter: 'test',
    twitch: 'test',
    ffxiv: {
        dataCenter: 'test',
        server: 'test',
    },
};

export const channelPostHandler = (status: 200 | 400 = 200) => {
    rest.get<Data, { id: string }, Data | Error>(path(), (req, res, ctx) => {});
};
