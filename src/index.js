import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from './store/store';
import { Provider} from 'react-redux';
import { currentContext } from "./hooks/currentContext";


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
, document.getElementById("root"));
