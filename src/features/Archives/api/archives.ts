import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (request: NextApiRequest, response: NextApiResponse) => void;

export const handler: Handler = async (request, response) => {
    const { method, query } = request;
    const APIKey = process.env.YOUTUBE_API;

    type QueryParams = typeof query;

    const createYoutubeURL = (query: QueryParams): string => {
        const channelId =
            typeof query.channelId === 'string'
                ? `?channelId=${query.channelId}`
                : ``;

        const nextPagetoken =
            typeof query.nextPagetoken === 'string'
                ? `&nextPagetoken=${query.nextPagetoken}`
                : ``;

        return `${process.env.YOUTUBE_API_URL}${channelId}${nextPagetoken}`;
    };

    switch (method) {
        case 'GET':
            try {
                if (!query.channelId) {
                    return response.status(400).json({
                        message: 'Method ChannelID Not Allowed',
                        status: 400,
                        error: true,
                    });
                }

                const res = await axios.get(createYoutubeURL(query));
                return response
                    .status(200)
                    .json({ item: res.data, status: 200 });
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    return response
                        .status(err.response.status)
                        .json({ ...err.response.data, error: true });
                }
                return response.status(500).json({});
            }

        default:
            response.setHeader('Allow', ['GET']);
            response.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
