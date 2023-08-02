import { CheckBox } from '@/_components/Elements/CheckBox';
import { SelectedCheckbox } from '@/_components/Elements/CheckBox';

import styles from '@/src/base/Parts/CheckBoxList/checkboxes.module.scss';

interface CheckBoxValue {
  id: number;
  name: string;
  code: string;
}

interface Props<T> {
  values: CheckBoxValue[];
  changeHandler: (selected: SelectedCheckbox) => void;
}

export const CheckBoxList = <T,>({ values, changeHandler }: Props<T>) => {
  return (
    <ul className={styles.checkbox_container}>
      {values.map((value) => (
        <li key={value.name} className={styles.checkbox_list}>
          <CheckBox
            label={value.name}
            value={value.code}
            changeHandler={changeHandler}
          />
        </li>
      ))}
    </ul>
  );
};
