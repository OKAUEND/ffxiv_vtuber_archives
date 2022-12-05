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
export const channelPostHandler = (status: 200 | 400 = 200) => {
    rest.get();
};
