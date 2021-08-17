import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import AdminAuthReducer from './adminAuthReducer/adminAuthReducer'

const combinedReducers = combineReducers({
    adminAuth : AdminAuthReducer
})

const persistedReducers = persistReducer({key:'rootPersistor',storage,whitelist:['productSeen' , 'cart' , 'userAuth']},combinedReducers)
export default persistedReducers