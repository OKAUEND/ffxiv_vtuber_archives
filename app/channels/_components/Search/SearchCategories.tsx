'use client';
import { useEffect } from 'react';

import { RadioList } from '@/_components/RadioList';

import {
  useChannelSearchOption,
  useChannelSearchBeginYear,
  useInitChannelSearch,
} from '@/channels/(hooks)/Search/useChannelSearchCategories';
import { ChannelSearchParams } from '@/channels/(types)';

import styles from '@/channels/_style/search/search.module.scss';

interface IProps {
  params?: ChannelSearchParams;
}

export const SearchCategories = ({ params }: IProps) => {
  const [initCategories] = useInitChannelSearch();
  const [selectedOption, sortData, changeOption] = useChannelSearchOption();
  const [selectedYear, years, changeYear] = useChannelSearchBeginYear();

  useEffect(() => {
    initCategories(params);
  }, []);

  return (
    <form action="/api/form" method="GET" className={styles.container}>
      <article>
        <h2>絞り込み</h2>
        <span>並び</span>
        <RadioList
          categories={sortData}
          selected={selectedOption.key}
          group="sort"
          changeHandler={changeOption}
        />
      </article>
      <article>
        <h2>カテゴリー検索</h2>
        <span>配信開始年</span>
        <RadioList
          categories={years}
          selected={selectedYear.key}
          group="year"
          changeHandler={changeYear}
        />
      </article>
      <div>
        <button className={styles.search_event}>検索する</button>
      </div>
    </form>
  );
};
