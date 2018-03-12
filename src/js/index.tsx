const css = require("../sass/main.scss");

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux"

import store from "./store"

import { App } from "./components/App";

ReactDOM.render(
    <Provider store={store}> 
        <App compiler="TypeScript" framework="React" />
    </Provider>,
    document.getElementById("app")
);