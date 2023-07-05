import { RadioList } from '@/_components/RadioList';
import { useFilterOption } from '@/control/(hooks)/useAdminControl';

import { FilterOption } from '@/control/(types)';

const option: FilterOption[] = ['all', 'Match', 'UnRegister'];

export const MatchFilter = () => {
  const [matchLevel, changeFilterOption] = useFilterOption();

  return (
    <RadioList
      categories={option}
      selected={matchLevel}
      group="match"
      changeHandler={changeFilterOption}
    />
  );
};
