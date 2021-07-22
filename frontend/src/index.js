import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import Store from "./Store";
import App from "./App.js";
import './index.css';

ReactDOM.render(
    <>
        <Provider store={Store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </>, document.getElementById("root"));