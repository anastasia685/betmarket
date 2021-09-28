//alter sidebar tags (id) -> add or remove
//set sidebar tags ([]) -> set new value

//alter header tags (id) -> add or remove

//search (query)
//order (id)
//range (lower, upper)

export const ALTER_SIDEBAR_TAGS = 'ALTER_SIDEBAR_TAGS';
export const SET_SIDEBAR_TAGS = 'SET_SIDEBAR_TAGS';

export const ALTER_HEADER_TAGS = 'ALTER_HEADER_TAGS';
export const SET_HEADER_TAGS = 'SET_HEADER_TAGS';

export const TOGGLE_SALE = 'TOGGLE_SALE';

export const ALTER_ORDER = 'ALTER_ORDER';

export const TOGGLE_CURRENCY = 'TOGGLE_CURRENCY';

export const SET_RANGE = 'SET_RANGE';

export const SET_SEARCH = 'SET_SEARCH';

export const alterSidebarTags = (tagId) => {
  return { type: ALTER_SIDEBAR_TAGS, payload: tagId };
};
export const setSidebarTags = (tagIds) => {
  return { type: SET_SIDEBAR_TAGS, payload: tagIds };
};

export const alterHeaderTags = (tagId) => {
  return { type: ALTER_HEADER_TAGS, payload: tagId };
};
export const setHeaderTags = (tagIds) => {
  return { type: SET_HEADER_TAGS, payload: tagIds };
};

export const toggleSale = () => {
  return { type: TOGGLE_SALE };
};

export const alterOrder = (orderId) => {
  return { type: ALTER_ORDER, payload: orderId };
};

export const toggleCurrency = () => {
  return { type: TOGGLE_CURRENCY };
};

export const setRange = (range) => {
  return { type: SET_RANGE, payload: range };
};

export const setSearch = (search) => {
  return { type: SET_SEARCH, payload: search };
};
