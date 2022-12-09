import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './core/createStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const initialState: any = {};

const store = configureStore(null, initialState);

root.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>
);


