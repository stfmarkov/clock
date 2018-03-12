import { createStore, combineReducers, applyMiddleware } from "redux";
// import { logger }  from "redux-logger";

import coords from "./reducers/coordsReducer"
import location from "./reducers/locationReducer"
import laps from "./reducers/lapReducer"

export default createStore(
    combineReducers({coords, location, laps}), 
    applyMiddleware() 
);