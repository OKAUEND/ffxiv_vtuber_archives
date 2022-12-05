import { rest } from 'msw';

export const channelPostHandler = (status: 200 | 400 = 200) => {
    rest.get();
};
