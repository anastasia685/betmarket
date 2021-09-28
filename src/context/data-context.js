import React from 'react';

import data from '../data.json';

const DataContext = React.createContext({
  currencies: {},
  marketItems: {},
  products: {},
  menuTags: {},
  filterBarTags: {},
  tags: {},
  discounts: {},
  ranges: {},
});

export const DataContextProvider = (props) => {
  const gelPrices = [];
  const lbpPrices = [];
  Object.keys(data.marketItems).forEach((key) => {
    const marketItem = data.marketItems[key];
    const currPrice = marketItem.discountId
      ? marketItem.discountPrice
      : marketItem.price;
    if (marketItem.currencyId === 'GEL') gelPrices.push(currPrice);
    else lbpPrices.push(currPrice);
  });
  const ranges = {
    GEL: { min: Math.min(...gelPrices), max: Math.max(...gelPrices) },
    LBP: { min: Math.min(...lbpPrices), max: Math.max(...lbpPrices) },
  };
  const formatedMarketItems = Object.keys(data.marketItems).map((key) => {
    return { id: key, ...data.marketItems[key] };
  });
  return (
    <DataContext.Provider
      value={{ ...data, marketItems: formatedMarketItems, ranges }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
