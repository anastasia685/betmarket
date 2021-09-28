import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
/*import 'moment/locale/ka';*/

import { setModal } from '../../store/actions/ui';
import DataContext from '../../context/data-context';

import Modal from '../UI/Modal/Modal';

import classes from './MarketList.module.css';

const MarketList = (props) => {
  const { marketItems, products, discounts, currencies } =
    useContext(DataContext);
  const filters = useSelector((state) => state.filters);
  const { modal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [currItems, setCurrItems] = useState(marketItems);
  const [currItem, setCurrItem] = useState({
    ...marketItems[0],
    descr: products[marketItems[0].productId].descr,
    currency: currencies[marketItems[0].currencyId].code,
  });

  useEffect(() => {
    const filteredItems = marketItems.filter((marketItem) => {
      //filter by currency
      const currencyIncludes = marketItem.currencyId === filters.currency;
      if (!currencyIncludes) return false;

      //filter by sale
      const saleIncludes = filters.sale ? marketItem.discountId !== null : true;
      if (!saleIncludes) return false;

      //filter by name
      //remove spaces from name and transform to lowercase
      const formatedName = marketItem.name.replace(/\s/g, '').toLowerCase();

      //remove spaces from search query and transform to lowercase
      const formatedQuery = filters.search.replace(/\s/g, '').toLowerCase();

      const nameIncludes = formatedName.includes(formatedQuery);
      if (!nameIncludes) return false;

      //filter by price
      const currPrice = marketItem.discountId
        ? marketItem.discountPrice
        : marketItem.price;
      const rangeIncludes =
        currPrice >= filters.range.min && currPrice <= filters.range.max;
      if (!rangeIncludes) return false;

      //filter by sidebar tags
      const sidebarIncludes = marketItem.tags.some((t) =>
        filters.sidebarTags.length > 0 ? filters.sidebarTags.includes(t) : true
      );
      if (!sidebarIncludes) return false;

      //filter by header tags
      /*const headerIncludes = marketItem.tags.some((t) =>
            filters.headerTags.length > 0
              ? filters.headerTags.includes(t)
              : true
          );*/
      const headerIncludes = filters.headerTags.every((t) =>
        marketItem.tags.includes(t)
      );
      if (!headerIncludes) return false;

      return true;
    });

    if (filters.order >= 0) {
      //sort filtered items
      const orderedItems = filteredItems.sort((a, b) => {
        const priceA = a.discountId ? a.discountPrice : a.price;
        const priceB = b.discountId ? b.discountPrice : b.price;

        switch (filters.order) {
          case 0:
            //alphabet
            return a.name.localeCompare(b.name);
          case 1:
            //reverse alphabet
            return b.name.localeCompare(a.name);
          case 2:
            //price asc
            return priceA - priceB;
          case 3:
            return priceB - priceA;
        }
      });
      setCurrItems(orderedItems);
    } else {
      setCurrItems(filteredItems);
    }
  }, [filters, marketItems]);

  return (
    <div className={classes.listContainer}>
      {modal &&
        createPortal(
          <Modal data={currItem} onDismiss={() => dispatch(setModal(false))} />,
          document.getElementById('wrapper-root')
        )}
      {currItems.map((marketItem) => {
        const productInfo = products[marketItem.productId];
        let discountInfo = {
          id: marketItem.discountId,
          discountPrice: marketItem.discountPrice,
        };
        if (discountInfo.id)
          discountInfo = { ...discountInfo, ...discounts[discountInfo.id] };
        return (
          <div
            key={marketItem.id}
            className={classes.listItem}
            style={{
              backgroundImage: `url(https://staticdata.lider-bet.com/images/market/12670.png)`,
            }}
          >
            <div className={classes.overlay}></div>
            <p className={classes.title}>{marketItem.name}</p>
            <p className={classes.description}>{productInfo.descr}</p>
            <p className={classes.details}>
              <span className={classes.name}>{marketItem.name}</span>
              <span className={classes.price}>
                {discountInfo.discountPrice
                  ? discountInfo.discountPrice
                  : marketItem.price}{' '}
                {currencies[marketItem.currencyId].code}
                {discountInfo.discountPrice && (
                  <>
                    <span className={classes.oldPrice}>
                      {marketItem.price}{' '}
                      {currencies[marketItem.currencyId].code}
                    </span>
                    <span className={classes.discountSmall}>
                      -{discountInfo.percent}%
                    </span>
                  </>
                )}
              </span>
              <span className={classes.buttonsContainer}>
                <button
                  onClick={() => {
                    setCurrItem({
                      ...marketItem,
                      descr: productInfo.descr,
                      currency: currencies[marketItem.currencyId].code,
                      forFriend: false,
                    });
                    dispatch(setModal(true));
                  }}
                >
                  buy
                </button>
                <button
                  onClick={() => {
                    setCurrItem({
                      ...marketItem,
                      descr: productInfo.descr,
                      currency: currencies[marketItem.currencyId].code,
                      forFriend: true,
                    });
                    dispatch(setModal(true));
                  }}
                >
                  for <br /> friend
                </button>
              </span>
            </p>

            <span className={classes.reward}>
              {marketItem.prizeAmount} {marketItem.prizeType}
            </span>
            {marketItem.discountId && (
              <div className={classes.discount}>
                <p>{moment(discountInfo.end_date).format('MMM DD, HH:mm')}</p>
                <p>-{discountInfo.percent}%</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MarketList;
