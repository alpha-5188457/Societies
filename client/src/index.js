import React from 'react'; //React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.
import ReactDOM from 'react-dom'; // The react-dom package provides DOM-specific methods that can be used at the top level of your app. The react-dom package also provides modules specific to client and server apps.
import {Provider} from 'react-redux'; // React Redux is the official React binding for Redux. It allows React components to read data from a Redux Store, and dispatch Actions to the Store to update
import {createStore, applyMiddleware, compose} from 'redux'; // Redux is an open-source JavaScript library for managing and centralizing application state.
import thunk from 'redux-thunk'; // Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the function's body once the asynchronous operations have been completed.

//user imports
import reducers from './reducers'; // Reducers are functions that take the current state and an action as arguments, and return a new state result.

import App from './App';
import './index.css';

//Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// To build more environments that React can render to, React team planned to split the main React package into two: react and react-dom . This paves the way to writing components that can be shared between the web version of React and React Native.
ReactDOM.render(
    
    /*Provider is the container for all React Spectrum applications. It defines the theme, locale, 
    and other application level settings, and can also be used to provide common properties to a group of components.*/
    <Provider store= {store} /* A store is an immutable object tree in Redux. A store is a state container which holds the application's state. Redux can have only a single store in your application. Whenever a store is created in Redux, you need to specify the reducer. */> 
        <App />
    </Provider>,
    document.getElementById('root')
);