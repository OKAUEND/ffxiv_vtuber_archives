'use client';

import styles from './radios.module.scss';

export interface Categories {
  key: string;
  name: string;
}

interface Props {
  categories: Categories[];
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

  const checkedStyle = (target: string) => {
    return selected === target ? styles.checked : '';
  };
  return (
    <ul className={styles.container}>
      {categories.map((category, index) => (
        <li key={index} className={styles.list}>
          <label
            className={`${styles.radio_group} ${checkedStyle(category.key)}`}
          >
            <input
              className={styles.radio}
              type="radio"
              value={category.key}
              name={group}
              checked={selected === category.key}
              onChange={onChange}
            />
            <span>{category.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
