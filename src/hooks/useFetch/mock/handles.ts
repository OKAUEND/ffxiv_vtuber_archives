import { rest } from 'msw';

const path = () => 'http://fetch.api.mock/';

export const useFetchAPIHandler = (status: 200 | 400 | 404 | 500 = 200) => {
    return rest.get(path(), async (req, res, ctx) => {
        if (status === 400) {
            return res(ctx.status(400), ctx.json({ message: 'Request Error' }));
        }

        if (status === 404) {
            return res(ctx.status(400), ctx.json({ message: 'Not Found' }));
        }

        if (status === 500) {
            return res(
                ctx.status(status),
                ctx.json({ message: 'Server Error' })
            );
        }

        return res(ctx.status(status), ctx.json({ message: 'Success' }));
    });
};
