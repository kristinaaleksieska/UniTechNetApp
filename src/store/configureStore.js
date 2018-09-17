import { firebaseConfig, firebase } from '../firebase/firebase';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { reactReduxFirebase } from 'react-redux-firebase';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const createStoreWithFirebase = compose(reactReduxFirebase(firebase, firebaseConfig))(createStore);

export default () => {
	const store = createStoreWithFirebase(
		connectRouter(history)(rootReducer),
		composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
	);
	return store;
};
