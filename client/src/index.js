import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//user imports
import reducers from './reducers';

import App from './App';
import './index.css';

//Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
const store = createStore(reducers, compose(applyMiddleware(thunk)));

/* The react-dom package provides DOM-specific methods that can be used at the top level of your app. 
The react-dom package also provides modules specific to client and server apps.*/
ReactDOM.render(
    
    /*Provider is the container for all React Spectrum applications. It defines the theme, locale, 
    and other application level settings, and can also be used to provide common properties to a group of components.*/
    <Provider store= {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);