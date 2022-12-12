import axios from 'axios';
import { NextApiHandler } from 'next';

export const handler: NextApiHandler = async (request, response) => {
    const { method } = request;
    switch (method) {
        case 'GET':
            try {
                // const res = await axios.get(process.env.CHANNELLIST_URL);
                response.status(200).json({ name: 'John Doe' });
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
