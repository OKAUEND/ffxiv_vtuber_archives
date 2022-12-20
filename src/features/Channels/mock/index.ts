import { rest } from 'msw';
import { HikasenVtuber } from '../types';

type Data = HikasenVtuber[];

type Error = {
    message: string;
    status: number;
};

const path = () => `vitest.api.com`;

export const HikasenVtuberResourceFactory = (name: string): HikasenVtuber => {
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

export const channelPostHandler = (status: 200 | 400 | 500 = 200) => {
    return rest.post<Data, { id: string }, Data | Error>(
        path(),
        async (req, res, ctx) => {
            if (status === 400) {
                return res(
                    ctx.status(400),
                    ctx.json({ message: 'Bad Request', status: 400 })
                );
            }

            if (status === 500) {
                return res(
                    ctx.status(status),
                    ctx.json({ message: 'Internal Server Error', status: 500 })
                );
            }

            return res(
                ctx.status(status),
                ctx.json([HikasenVtuberResourceFactory('Mock')])
            );
        }
    );
};
