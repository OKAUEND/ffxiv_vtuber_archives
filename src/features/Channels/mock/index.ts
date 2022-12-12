import { rest } from 'msw';
import { HikasenVtuber } from '../types';

type Data = {
    data: string;
};

type Error = {
    message: string;
    status: number;
};

const path = () => `vitest.api.com`;

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
    return rest.post<Data, { id: string }, Data | Error>(
        path(),
        async (req, res, ctx) => {
            if (status === 400) {
                return res(
                    ctx.status(status),
                    ctx.json({ message: 'Bad Request', status: 400 })
                );
            }

            return res(ctx.status(status), ctx.json({ data: 'Success!' }));
        }
    );
};
