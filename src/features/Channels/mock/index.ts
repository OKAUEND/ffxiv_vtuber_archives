import { rest } from 'msw';

type Data = {
    id: string;
    title: string;
    body: string;
};

type Error = {
    message: string;
    status: number;
};
const HOST = process.env.NEXT_PUBLIC_HOST;

const path = () => `${HOST}/api/channel`;

export const channelPostHandler = (status: 200 | 400 = 200) => {
    rest.get<Data, { id: string }, Data | Error>(path(), (req, res, ctx) => {});
};
