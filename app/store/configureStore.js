/**
 * configureStore.js
 */

import {autoRehydrate, persistStore} from "redux-persist-immutable";
import {combineReducers} from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import {REHYDRATE} from "redux-persist/constants";
import Immutable from "immutable";
import {applyMiddleware, compose, createStore} from "redux";
import {AsyncStorage} from "react-native";
import createSagaMiddleware from "redux-saga";

import saveSubsetFilter from '../utils/saveSubsetFilter'

import authReducer from "../reducers/authReducer";
import rootReducer from "../reducers/rootReducer";
import unionReducer from "../reducers/unionReducer";
import shoppingReducer from "../reducers/shoppingReducer";
import orderReducer from "../reducers/orderReducer";

import { rootSaga } from './saga';
import {RefreshState} from "../components/RefreshListView";
import constants from '../resources/constants';

const combinedReducers = combineReducers({
  root: rootReducer,
  auth: authReducer,
  union: unionReducer,
  shopping: shoppingReducer,
  order: orderReducer,
});

const initialState = new Immutable.Map({
  root: Immutable.Map({
    loading: false,
  }),
  auth: Immutable.Map({
    isLoggedIn: false,
    isRegisterSuccess: false,
    loginError: '',
    registerError: '',
    username: '',
    password: '',
    sessionId: '',
    mobilePhone:'',
    personInfo: null,
    customerInfo: null,
    unionId: '',
    merchantId: '',
    cartId: '',
    dataError: '',
    dataResponse: constants.INITIAL,
  }),
  union: Immutable.Map({
    union: null,
    discount: null,
    priceList: [],
    unions: [],
    merchant: null,
    merchants: [],
    edges: [],
    advertisements: [],
    refreshState: RefreshState.Idle,
    regulation: '',
    dataError: '',
    dataResponse: constants.INITIAL,
  }),
  shopping: Immutable.Map({
    dataError: '',
    dataResponse: constants.INITIAL,
    cartInfo:[]
  }),
  order: Immutable.Map({
    dataError: '',
    dataResponse: constants.INITIAL,
    orderItemList:[],
    discountItemList:[],
    totalFee: 0,
    discountFee: 0,
    totalFeeFinal: 0,
    orderList:[]
  }),
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
      combinedReducers,
      initialState,
      compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({log: true})));

  persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: ['auth','union','shopping'],
        transforms: [
          saveSubsetFilter(['username','password','sessionId','union','cartInfo',])
        ],
      }
  );

  return {
    ...store, runSaga: [sagaMiddleware.run(rootSaga)]
  };
}
