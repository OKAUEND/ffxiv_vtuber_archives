import { rest } from 'msw';

export const Success = { message: 'Success' };

export const RequestError = { message: 'Request Error' };

export const NotFound = { message: 'Not Found' };

export const ServerError = { message: 'Server Error' };

export const path = () => 'http://fetch.api.mock/';

export const useFetchAPIHandler = (status: 200 | 400 | 404 | 500 = 200) => {
    return rest.get(path(), async (req, res, ctx) => {
        if (status === 400) {
            return res(ctx.status(400), ctx.json(RequestError));
        }

        if (status === 404) {
            return res(ctx.status(404), ctx.json(NotFound));
        }

        if (status === 500) {
            return res(ctx.status(status), ctx.json(ServerError));
        }

        return res(ctx.status(status), ctx.json(Success));
    });
};
