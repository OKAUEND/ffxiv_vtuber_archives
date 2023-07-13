'use client';

import { RadioList } from '@/_components/RadioList';

import {
  useChannelSearchOption,
  useChannelSearchBeginYear,
} from '@/channels/(hooks)/Search/useChannelSearchCategories';

export const SearchCategories = () => {
  const [selectedOption, sortData, changeOption] = useChannelSearchOption();
  const [selectedYear, years, changeYear] = useChannelSearchBeginYear();
  return (
    <section>
      <form action="/api/form" method="GET">
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
        <button>検索する</button>
      </form>
    </section>
  );
};
