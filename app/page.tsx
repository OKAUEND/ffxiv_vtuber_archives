import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import { Pagination } from './_components/Pagination';
import { getChannel } from '@/app/channels/_lib/api/getChannel';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const pokemon = await getChannel('1');
  const results = pokemon.results;
  const test = [1, 2, 3, 4, 5, 6];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {test.map((item) => (
          <li>
            <div>{item}</div>
          </li>
        ))}
      </ul>

      <div>
        <Link href={'/archives/mock'}>TEST Mock</Link>
      </div>

      <div>
        <Link href={'/channels/2'}>TEST Channel!!</Link>
      </div>

      <Pagination currentPageNumber={1} />
    </main>
  );
}
