import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  alterHeaderTags,
  setHeaderTags,
  toggleSale,
  alterOrder,
  setSearch,
  toggleCurrency,
} from '../../store/actions/filters';
import { setSidebar } from '../../store/actions/ui';

import DataContext from '../../context/data-context';

import Checkbox from '../UI/Checkbox/Checkbox';
import Switch from '../UI/Switch/Switch';
import OutsideAlerter from '../UI/OutsideAlerter/OutsideAlerter';

import classes from './Header.module.css';

const Header = () => {
  const { tags, filterBarTags, currencies } = useContext(DataContext);
  const {
    headerTags: activeTags,
    sale,
    order,
    search,
    currency,
  } = useSelector((state) => state.filters);

  //console.log(search);

  const dispatch = useDispatch();

  const [showOrder, setShowOrder] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const saleToggleHandler = useCallback(() => {
    dispatch(toggleSale());
  }, [dispatch]);
  const sidebarToggleHandler = useCallback(() => {
    dispatch(setSidebar(true));
  }, [dispatch]);

  const selectChangeHandler = useCallback(
    (event) => {
      const newValue =
        event.target.value > 0 ? [parseInt(event.target.value)] : [];
      dispatch(setHeaderTags(newValue));
    },
    [dispatch]
  );

  const switchChangeHandler = useCallback(() => {
    dispatch(toggleCurrency());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearch(searchValue));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, dispatch]);

  return (
    <header className={classes.headerWrapper}>
      <section className={classes.headerMobile}>
        <div className={classes.menuContainer} onClick={sidebarToggleHandler}>
          <img src='/icons/menu.png'></img>
          <label>menu</label>
        </div>
        <div className={classes.inputContainer}>
          <input
            type='search'
            style={{ backgroundImage: `url('/icons/search.png')` }}
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
          />
        </div>
      </section>
      <section className={classes.header}>
        <ul className={classes.filterItems}>
          {filterBarTags.map((item) => (
            <li
              key={item.id}
              onClick={() => dispatch(alterHeaderTags(item.id))}
            >
              <Checkbox isChecked={activeTags.includes(item.id)} />
              {tags[item.id].name}
            </li>
          ))}
          <li onClick={saleToggleHandler}>
            <Checkbox isChecked={sale} />
            sale
          </li>
        </ul>
        <Switch
          labelLeft={currencies.GEL.code}
          labelRight={currencies.LBP.code}
          isLeft={currency === 'GEL'}
          callback={switchChangeHandler}
        />
        <div className={classes.right}>
          <input
            type='search'
            autoComplete='off'
            placeholder='ძებნა'
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
          />
          <select value={activeTags[0]} onChange={selectChangeHandler}>
            <option value={-1}>all</option>
            {filterBarTags.map((item) => (
              <option
                key={item.id}
                /*onClick={() => dispatch(alterHeaderTags(item.id))}*/
                value={item.id}
              >
                {tags[item.id].name}
              </option>
            ))}
            <option onClick={saleToggleHandler}>sale</option>
          </select>
          <OutsideAlerter callback={() => setShowOrder(false)}>
            <button
              style={{ backgroundImage: `url('/icons/order.png')` }}
              onClick={() => setShowOrder((prevState) => !prevState)}
            ></button>

            <ul
              className={classNames(
                classes.orderList,
                showOrder && classes.show
              )}
            >
              <li onClick={() => dispatch(alterOrder(0))}>
                <Checkbox isChecked={order === 0} />
                <span>A - Z alphabet</span>
              </li>
              <li onClick={() => dispatch(alterOrder(1))}>
                <Checkbox isChecked={order === 1} />
                <span>Z - A alphabet</span>
              </li>
              <li onClick={() => dispatch(alterOrder(2))}>
                <Checkbox isChecked={order === 2} />
                <span>Ascending price</span>
              </li>
              <li onClick={() => dispatch(alterOrder(3))}>
                <Checkbox isChecked={order === 3} />
                <span>Descending price</span>
              </li>
            </ul>
          </OutsideAlerter>
        </div>
      </section>
    </header>
  );
};

export default React.memo(Header);
