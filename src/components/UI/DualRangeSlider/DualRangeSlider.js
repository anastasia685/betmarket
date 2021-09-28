import React, { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

import classes from './DualRangeSlider.module.css';

const DualRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const rangeRef = useRef(null);
  const leftValRef = useRef(null);
  const rightValRef = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Reset ranges on limit change
  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);

    minValRef.current = min;
    maxValRef.current = max;
  }, [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
    if (leftValRef.current) {
      const offset = minPercent / 25 - 4;
      leftValRef.current.style.left = `calc(${minPercent}% - ${offset}px)`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
    if (rightValRef.current) {
      const offset = maxPercent / 20;
      rightValRef.current.style.left = `calc(${maxPercent}% - ${offset}px)`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={classes.container}>
      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={classNames(classes.thumb, classes.thumbLeft)}
        style={{ zIndex: minVal > max - 100 && '5' }}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={classNames(classes.thumb, classes.thumbRight)}
      />

      <div className={classes.slider}>
        <div className={classes.sliderTrack} />
        <div ref={rangeRef} className={classes.sliderRange} />
        <div ref={leftValRef} className={classes.sliderLeftValue}>
          {minVal}
        </div>
        <div ref={rightValRef} className={classes.sliderRightValue}>
          {maxVal}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DualRangeSlider);
