import React from 'react';

import classes from './Modal.module.css';

const Modal = (props) => {
  const { data, onDismiss } = props;
  return (
    <div className={classes.container}>
      <header>
        <span>
          {data.prizeAmount} {data.prizeType}
        </span>
        <button
          style={{ backgroundImage: `url('/icons/close.svg')` }}
          onClick={onDismiss}
        ></button>
      </header>
      <section>
        <div className={classes.imageContainer}>
          <img src='https://staticdata.lider-bet.com/images/market/12670.png' />
        </div>
        <p className={classes.title}>
          <span>{data.name}</span>
          <span>{data.descr}</span>
        </p>
        <p className={classes.price}>
          <span>
            {data.discountId ? data.discountPrice : data.price} {data.currency}
          </span>
          {data.discountId && (
            <span>
              {data.price} {data.currency}
            </span>
          )}
        </p>
        {data.forFriend && (
          <div className={classes.friendContainer}>
            <div className={classes.inputContainer}>
              <input type='text' autoComplete='off' id='username' required />
              <label htmlFor='username'>მომხმარებლის სახელი</label>
            </div>
            <div className={classes.inputContainer}>
              <input type='number' id='pin' autoComplete='off' required />
              <label htmlFor='pin'>მომხმარებლის პინი</label>
            </div>
          </div>
        )}
      </section>
      <footer>
        <button className={classes.primary}>buy</button>
        <button className={classes.secondary} onClick={onDismiss}>
          cancel
        </button>
      </footer>
    </div>
  );
};

export default Modal;
