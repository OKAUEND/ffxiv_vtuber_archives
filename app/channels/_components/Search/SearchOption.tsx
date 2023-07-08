'use client';

import { RadioList } from '@/_components/RadioList';

import {
  useChannelSearchOption,
  sortOptions,
} from '@/channels/(hooks)/Search/useChannelSearchOption';

export const SearchOption = () => {
  const [selectedOption, changeOption] = useChannelSearchOption();
  return (
    <section>
      <h2>絞り込み</h2>
      <article>
        <RadioList
          categories={sortOptions}
          selected={selectedOption.key}
          group="Sort"
          changeHandler={changeOption}
        />
      </article>
    </section>
  );
};
