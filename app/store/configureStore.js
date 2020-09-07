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
    phoneChecked:null,
    isAgree:null,
    personInfo: null,
    customerInfo: null,
    unionId: '',
    merchantId: '',
    cartId: '',
    dataError: '',
    dataResponse: constants.INITIAL,
    helpSeg:0,
    rootHelpSeg:0,
    unionHelpSeg:0,
    shoppingHelpSeg:0,
    orderHelpSeg:0,
    historyHelpSeg:0,
    registerHelp:null,
    loggedHelp:null,
    helpError:null,
    isNewDevice:false,
  }),
  union: Immutable.Map({
    union: null,
    discount: null,
    priceList: [],
    taxId:null,
    backTop:0,
    start:2,
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
    cartInfo:[],
    goodsNumber:0,
    classList:[],
  }),
  order: Immutable.Map({
    dataError: '',
    dataResponse: constants.INITIAL,
    orderItemList:[],
    discountItemList:[],
    totalFee: 0,
    discountFee: 0,
    totalDiscount:0,
    totalFeeFinal: 0,
    isDiscountScale:null,
    isOrderMinLimit:null,
    noDiscountTotal:null,
    orderDiscountFee:null,
    orderDiscountScale:null,
    orderList:[],
    addressList:[],
    recallState:null,
    carList:[],
    telList:['123','454','789'],
    nameList:[{id:0,name:'代岩'},{id:1,name:'效果'},{id:2,name:'小朱'},{id:3,name:'亚辉'},
        {id:4,name:'赵一'},{id:5,name:'王二'},{id:6,name:'张三'},{id:7,name:'李四'},
        {id:8,name:'孙武'},{id:9,name:'小周'},{id:2,name:'小吴'},{id:2,name:'小冯'}],
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
