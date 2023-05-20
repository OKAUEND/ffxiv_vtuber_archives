'use client';

import Link from 'next/link';

interface Props {
  totalCount: number;
  currentPageNumber: number;
}

export const Pagination = ({ currentPageNumber = 1 }: Props) => {
  const PER_PAGE = 5;
  const offsetPageNumber =
    currentPageNumber > PER_PAGE - 1 ? currentPageNumber - 2 : 1;

  const paginationList = () =>
    [...Array(PER_PAGE)].map((_, index) => offsetPageNumber + index);

  return (
    <ul>
      {paginationList().map((number, index) => (
        <li key={index}>
          <Link href={`${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
