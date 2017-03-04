import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import {Router, browserHistory} from 'react-router';
import reducers from './reducers';
import thunk from 'redux-thunk';
import routes from './routes';

// OLD WAY OF CREATING STORE
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const middlewares = applyMiddleware(thunk, promise)

const enhancer = compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(reducers, enhancer);

{/*<Provider store={createStoreWithMiddleware(reducers)}>*/
}
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory} routes={routes}/>
        </div>
    </Provider>
    , document.querySelector('.container'));
