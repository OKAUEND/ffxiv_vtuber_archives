import { rest } from 'msw';

export const handlers = [
    rest.post('../api/channel', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.post('../api/archives', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
