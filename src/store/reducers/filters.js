import {
  ALTER_SIDEBAR_TAGS,
  SET_SIDEBAR_TAGS,
  ALTER_HEADER_TAGS,
  SET_HEADER_TAGS,
  TOGGLE_SALE,
  ALTER_ORDER,
  TOGGLE_CURRENCY,
  SET_RANGE,
  SET_SEARCH,
} from '../actions/filters';

const initialState = {
  sidebarTags: [],
  headerTags: [],
  sale: false,
  search: '',
  order: -1,
  currency: 'GEL',
  range: {
    min: 0,
    max: 1000,
  },
};

export default (state = initialState, action) => {
  let updatedSidebarTags, updatedHeaderTags;
  switch (action.type) {
    case ALTER_SIDEBAR_TAGS:
      updatedSidebarTags = [...state.sidebarTags];
      if (updatedSidebarTags.includes(action.payload))
        updatedSidebarTags = updatedSidebarTags.filter(
          (item) => item !== action.payload
        );
      else updatedSidebarTags.push(action.payload);
      return { ...state, sidebarTags: updatedSidebarTags };

    case SET_SIDEBAR_TAGS:
      return { ...state, sidebarTags: action.payload };

    case ALTER_HEADER_TAGS:
      updatedHeaderTags = [...state.headerTags];
      if (updatedHeaderTags.includes(action.payload)) {
        updatedHeaderTags = updatedHeaderTags.filter(
          (i) => i !== action.payload
        );
      } else {
        updatedHeaderTags.push(action.payload);
      }
      return { ...state, headerTags: updatedHeaderTags };

    case SET_HEADER_TAGS:
      return { ...state, headerTags: action.payload };

    case TOGGLE_SALE:
      return { ...state, sale: !state.sale };

    case ALTER_ORDER:
      return {
        ...state,
        order: action.payload !== state.order ? action.payload : -1,
      };

    case TOGGLE_CURRENCY:
      return { ...state, currency: state.currency === 'GEL' ? 'LBP' : 'GEL' };

    case SET_RANGE:
      return { ...state, range: action.payload };

    case SET_SEARCH:
      return { ...state, search: action.payload };
  }
  return state;
};
