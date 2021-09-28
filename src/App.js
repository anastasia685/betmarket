import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DataContext from './context/data-context';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MarketList from './components/MarketList/MarketList';
import Header from './components/Header/Header';
import DualRangeSlider from './components/UI/DualRangeSlider/DualRangeSlider';
import Modal from './components/UI/Modal/Modal';

import { setRange } from './store/actions/filters';
import { setSidebar, setModal } from './store/actions/ui';

import classes from './App.module.css';

const App = () => {
  const { sidebar, modal } = useSelector((state) => state.ui);
  const { currency } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);

  const { ranges } = useContext(DataContext);

  const [currRange, setCurrRange] = useState({
    min: ranges[currency].min,
    max: ranges[currency].max,
  });

  const rangeHandler = useCallback((range) => {
    setCurrRange(range);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setRange(currRange));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [currRange, dispatch]);

  const overlayClickHandler = useCallback(() => {
    if (sidebar) dispatch(setSidebar(false));
    if (modal) dispatch(setModal(false));
  }, [dispatch, sidebar, modal]);

  return (
    <>
      <Navbar />
      <div className={classes.wrapper} ref={wrapperRef}>
        {(sidebar || modal) && (
          <div className={classes.overlay} onClick={overlayClickHandler}></div>
        )}
        {/*{modal && <Modal />}*/}
        <main>
          <Sidebar />
          <section className={classes.marketContainer}>
            <Header />
            <section className={classes.offersContainer}>
              <h3>offers</h3>
              <div
                style={{
                  flex: 1,
                  maxWidth: '400px',
                }}
              >
                <DualRangeSlider
                  min={ranges[currency].min}
                  max={ranges[currency].max}
                  onChange={rangeHandler}
                />
              </div>
            </section>
            <MarketList wrapperRef={wrapperRef} />
          </section>
        </main>
      </div>
    </>
  );
};

export default App;
