import { firebaseConfig, firebase } from "../firebase/firebase";
import { createStore, compose, applyMiddleware } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, firebaseConfig)
)(createStore);

export default () => {
  const store = createStoreWithFirebase(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
