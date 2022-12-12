import './App.css';
import {Provider, useDispatch, useSelector} from "react-redux";
import { bindActionCreators, Store } from 'redux';
import { ApplicationState } from './reducers/type';
import { ToastContainer, ToastContainerProps } from "react-toastify";
import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
    useNavigate,
    Navigate, BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';
import HomePage from './components/HomePage';
import * as actionCreators from "../src/reducers/start/user/actionUser"
import Pages from './components/Pages';
import {MapContainer, TileLayer} from "react-leaflet"

type MainAppProps = {
    store: Store<ApplicationState>;
};

const toastContainerOptions: ToastContainerProps = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    closeButton: true,
    draggable: false,
};
function App(props:MainAppProps) {

  return (
      <Provider store={props.store}>
          <ToastContainer {...toastContainerOptions} />
          <Pages/>
      </Provider>
  );
}

export default App;
