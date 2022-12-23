import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (request: NextApiRequest, response: NextApiResponse) => void;

export const handler: Handler = async (request, response) => {
    const { method } = request;
    const APIKey = process.env.YOUTUBE_API;

    const createYoutubeURL = (channelId: string, query: string): string => {
        return `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}=${channelId}${query}`;
    };

    switch (method) {
        case 'GET':
            try {
                const path = process.env.YOUTUBE_API_URL;
                const res = await axios.get(path);
                return response.status(200).json(res.data);
            } catch (e) {
                console.error('Request error', e);
                response.status(500).json({ error: 'Error fetchng posts' });
            }
            break;

        default:
            response.setHeader('Allow', ['GET']);
            response.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
