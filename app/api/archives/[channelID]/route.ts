import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  //   console.log(request.nextUrl.searchParams.get('mock'));
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('mock');
  const data = 'TEST';

  return NextResponse.json({ data });
}
