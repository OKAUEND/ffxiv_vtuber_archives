'use client';

import styles from './radios.module.scss';

interface Props {
  categories: string[];
  selected: string;
  group: string;
  changeHandler: (selected: string) => void;
}

export const RadioList = ({
  categories,
  selected,
  group,
  changeHandler,
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(event.target.value);
  };
  return (
    <ul className={styles.radio_container}>
      {categories.map((category, index) => (
        <li key={index} className={styles.radio_list}>
          <label className={styles.radio_group}>
            <input
              className={styles.radio}
              type="radio"
              value={category}
              name={group}
              checked={selected === category}
              onChange={onChange}
            />
            <span className={styles.radio_text}> {category}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
