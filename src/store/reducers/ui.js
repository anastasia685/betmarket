import { SET_SIDEBAR, SET_MODAL } from '../actions/ui';

const initalState = {
  sidebar: false,
  modal: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sidebar: action.payload };
    case SET_MODAL:
      return { ...state, modal: action.payload };
  }
  return state;
};
