import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  console.log(request.nextUrl.searchParams.get('mock'));
  console.log({ params });
  const data = 'TEST';

  return NextResponse.json({ data });
}
