import React from 'react';
import classNames from 'classnames';

import classes from './Switch.module.css';

const Switch = (props) => {
  return (
    <div className={classes.container}>
      <label>{props.labelLeft}</label>
      <span
        className={classNames(classes.switch, !props.isLeft && classes.right)}
        onClick={() => props.callback()}
      ></span>
      <label>{props.labelRight}</label>
    </div>
  );
};

export default Switch;
