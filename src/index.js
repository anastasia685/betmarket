import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { DataContextProvider } from './context/data-context';
import filtersReducer from './store/reducers/filters';
import uiReducer from './store/reducers/ui';

const rootReducer = combineReducers({ filters: filtersReducer, ui: uiReducer });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
