'use client';

import Link from 'next/link';

const beginLiveYears = [
  { key: '2018', name: '2018年' },
  { key: '2019', name: '2019年' },
  { key: '2020', name: '2020年' },
  { key: '2021', name: '2021年' },
];

export const SearchCategories = () => {
  return (
    <section>
      <h2>カテゴリー検索</h2>
      <article>
        <span>配信開始年</span>
        <ul>
          {beginLiveYears.map((year) => (
            <li key={year.key}>
              <Link href={'/channels/result'}>{year.name}</Link>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};
