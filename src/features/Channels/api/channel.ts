import axios from 'axios';
import { NextApiHandler } from 'next';

export const handler: NextApiHandler = async (request, response) => {
    const { method } = request;
    switch (method) {
        case 'POST':
            try {
                const path = process.env.CHANNELLIST_URL;
                const res = await fetch(path, { method: 'POST' });
                const date = await res.json();
                if (!res.ok) {
                    return response.status(400).json(date);
                }
                return response.status(200).json(date);
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
