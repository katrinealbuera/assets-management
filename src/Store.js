import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { AUTHENTICATED } from './actions/assetAction';

const initialState = {};
const middleware = [thunk];
const user = localStorage.getItem('user');

const store = createStore(
  rootReducer, 
  initialState, 
  applyMiddleware(...middleware)
);

if (user) {
  store.dispatch({
    type: AUTHENTICATED
  })
}

export default store;