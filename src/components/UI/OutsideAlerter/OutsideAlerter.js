import React, { useEffect, useRef } from 'react';

const useOutsideAlert = (ref, callback) => {
  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', outsideClickHandler);

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  }, [ref, callback]);
};

const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlert(wrapperRef, props.callback);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export default OutsideAlerter;
