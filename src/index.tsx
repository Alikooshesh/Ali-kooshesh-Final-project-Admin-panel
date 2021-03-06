import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {store , persistore} from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistore}>
                <App />
            </PersistGate>
        </Provider>

    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
