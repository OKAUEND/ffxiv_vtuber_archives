'use client';

import {} from './(hook)/useAccordion';
import styles from './accordion.module.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion = ({ title, children }: IProps) => {
  return (
    <>
      <button>{title}</button>
      <div>{children}</div>
    </>
  );
};
