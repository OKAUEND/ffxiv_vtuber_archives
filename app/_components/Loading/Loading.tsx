'use client';

import styles from './Loading.module.scss';

export const LoadingBasicAnimation = () => {
  return (
    <article className={styles.container}>
      <div className={styles.loading} />
    </article>
  );
};
