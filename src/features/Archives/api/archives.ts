import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (request: NextApiRequest, response: NextApiResponse) => void;

const handler: Handler = (request, response) => {};

export default handler;
