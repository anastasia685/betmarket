import React from 'react';
import classNames from 'classnames';

import classes from './Checkbox.module.css';

const Checkbox = (props) => {
  return (
    <input
      className={classNames(classes.checkbox, props.small && classes.small)}
      type='checkbox'
      checked={props.isChecked}
      onChange={props.onToggle ? props.onToggle : () => {}}
    />
  );
};

export default React.memo(Checkbox);
