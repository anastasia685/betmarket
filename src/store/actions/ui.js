export const SET_SIDEBAR = 'SET_SIDEBAR';

export const SET_MODAL = 'TOGGLE_MODAL';

export const setSidebar = (value) => {
  return { type: SET_SIDEBAR, payload: value };
};
export const setModal = (value) => {
  return { type: SET_MODAL, payload: value };
};
