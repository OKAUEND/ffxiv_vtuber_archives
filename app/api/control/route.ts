import { fetchExtend } from '@/_utile/fetch';
import { HikasenVtuber } from '@/(types)/';

export async function GET() {
  const url = `${process.env.CHANNELLIST_URL}`;

  const channels = await fetchExtend<HikasenVtuber[]>({ url });
  return new Response(JSON.stringify(channels));
}
