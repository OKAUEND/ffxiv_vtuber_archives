import { fetchExtend } from '@/_utile/fetch';
import { HikasenVtuber } from '@/(types)/';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn'],
});

export async function GET() {
  const url = `${process.env.CHANNELLIST_URL}`;

  const channels = await fetchExtend<HikasenVtuber[]>({ url });
  const test = await prisma.user.findMany();
  return new Response(JSON.stringify(channels));
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const test = await prisma.user.create({
    data: {
      email: `Hiroshi@${name}`,
      name: `Hiroshi${name}`,
    },
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const test = await prisma.user.deleteMany({
    where: {
      email: {
        contains: `Hiroshi@${name}`,
      },
    },
  });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const time = new Date('2013-08-13T12:00:00Z').toISOString();
  const test = await prisma.user.update({
    where: {
      email: `Hiroshi@HQ`,
    },
    data: {
      create_at: time,
    },
  });
}
