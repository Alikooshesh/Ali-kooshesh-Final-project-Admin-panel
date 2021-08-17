import {createStore} from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";
import persistedReducers from "./reducers/reducersIndex";

export const store = createStore(persistedReducers)
export const persistore = persistStore(store)