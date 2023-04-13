import { rest } from 'msw';

const path = () => 'http://fetch.api.mock/';

export const useFetchAPIHandler = (status: 200 | 400 | 500 = 200) => {
    return rest.get(path(), async (req, res, ctx) => {
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

        return res(ctx.status(status), ctx.json({ message: 'Success' }));
    });
};
