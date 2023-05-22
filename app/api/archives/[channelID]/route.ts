import { NextRequest } from 'next/server';
import { fetchExtend } from '@/app/_utile/fetch';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const APIKey = process.env.API_KEY;
  const query = request.nextUrl.searchParams.get('mock');
  const slug = params.slug;

  const url = `${process.env.YOUTUBE_API_URL}?channelId=${slug}&key=${APIKey}&part=snippet&type=video&order=date&q=FF14|FFXIV&maxResults=25`;

  if (slug === '' || slug === null) {
    return new Response(JSON.stringify('TEST'), {
      status: 400,
    });
  }
  const res = await fetchExtend<
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>
  >({ url: url });
}
