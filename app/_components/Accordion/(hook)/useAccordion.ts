import { atom, selector, useRecoilValue, useRecoilCallback } from 'recoil';

const accordionHidden = atom<boolean>({
  key: 'state/accordion-visible',
  default: true,
});

const createAccordionStyles = selector<string>({
  key: 'create/accordion-style',
  get: ({ get }) => {
    const isHidden = get(accordionHidden);
    return isHidden ? '--open' : '--hidden';
  },
});

export const useAccordion = () => {
  const accordionStyle = useRecoilValue(createAccordionStyles);

  const changeHidden = useRecoilCallback(({ set }) => () => {
    set(accordionHidden, (prev) => !prev);
  });

  return [accordionStyle, changeHidden] as const;
};
