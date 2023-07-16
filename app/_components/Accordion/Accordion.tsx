'use client';

import { useAccordion } from './(hook)/useAccordion';
import styles from './accordion.module.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion = ({ title, children }: IProps) => {
  const [accordionStyle, changeVisible] = useAccordion();
  return (
    <>
      <button onClick={changeVisible}>{title}</button>
      <div className={`${accordionStyle}`}>{children}</div>
    </>
  );
};
