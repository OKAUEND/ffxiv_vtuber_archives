import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (request: NextApiRequest, response: NextApiResponse) => void;

export const handler: Handler = async (request, response) => {
    const { method } = request;
    switch (method) {
        case 'GET':
            try {
                const res = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?channelId=${'channelId'}${'query'}`
                );
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
