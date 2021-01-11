/**
 * shopping-saga.js
 */

import {Alert} from 'react-native'
import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/ShoppingApi";
import * as shoppingActions from "../actions/shopping-actions";
import * as authActions from "../actions/auth-actions";
import * as unionActions from "../actions/union-actions";
import strings from '../resources/strings';
import constants from "../resources/constants";
const count = constants.PRICE_LIST_PAGE;

// 获取购物车列表
function* getCustomerCartCommodityInfo (action) {
  const {cartId,unionId} = action;
    var goodsNumber=0;
    var goodsPrice=0;
  try {
    const response = yield call(Api.getCustomerCartCommodityInfo, cartId,unionId);
    if (response.re === 1) {
        console.log(response.data)
      const cartId = response.data.cartId;
      const cartInfo = response.data.itemList;
        cartInfo.map((item,i)=>{
            goodsNumber=goodsNumber+item.amount;
            goodsPrice=goodsPrice+item.amount*item.price;
        });
      yield put(authActions.setCustomerCart(cartId));
      yield put(shoppingActions.getCartInfoSuccess(cartInfo,goodsNumber,goodsPrice));


      // console.log(cartInfo.length)
    } else {
        Alert.alert(strings.alertTitle,strings.time_out);
      yield put(shoppingActions.getCartInfoFail(strings.getCartInfoFail));
    }
  } catch (error) {
    yield put(shoppingActions.getCartInfoFail(error));
  }
}

// 获取商品种类列表
function* getCommodityClass (action) {
    const {unionId} = action;
    try {
        const response = yield call(Api.getCommodityClass,unionId);
        console.log(response)
        if (response.re === 1) {
            console.log(response)
            const classList = response.data;
            yield put(shoppingActions.getCommodityClassSuccess(classList));

        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(shoppingActions.getCommodityClassFail(strings.getCommodityClassFail));
        }
    } catch (error) {
        yield put(shoppingActions.getCommodityClassFail(error));
    }
}

// 更新购物车列表
function* updateCustomerCartCommodity (action) {
  const {cartInfo, unionId,searchText,detail,taxId} = action;
  try {

    const response = yield call(Api.updateCustomerCartCommodity, cartInfo.itemId, cartInfo.commodityId, cartInfo.amount, unionId);
    if (response.re === 1) {
      const cartInfoItem = response.data;
        console.log(cartInfoItem)
        yield put(unionActions.updatePriceListSuccess(cartInfoItem));
      yield put(shoppingActions.updateCartInfoSuccess(cartInfoItem));
      if(detail==1){
          if(taxId!=null){
              yield put(unionActions.getPriceListByTax(taxId,unionId,cartInfo.cartId));
          }
          else{
              if(searchText!=null && searchText != '' && searchText!=undefined){
                  yield put(unionActions.getUnionPriceListLucene(unionId, searchText,cartInfo.cartId));
              }
              else{
                  yield put(unionActions.getUnionPriceList(unionId, 0, count,cartInfo.cartId));
              }
          }

      }


      console.log(cartInfo)
    } else {
        Alert.alert(strings.alertTitle,strings.time_out);
      yield put(shoppingActions.updateCartInfoFail(strings.updateCartInfoFail));
    }
  } catch (error) {
    yield put(shoppingActions.updateCartInfoFail(error))
  }
}

// 清空购车
function* clearShoppingCar (action) {
    const {cartId,unionId} = action;
    try {
        const response = yield call(Api.clearShoppingCar, cartId);
        if (response.re === 1) {
            console.log(response)
            yield put(shoppingActions.getCartInfo(cartId,unionId));
            yield put(unionActions.getUnionPriceList(unionId, 0, count,cartId));
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(shoppingActions.clearCartInfoFail(strings.clearCarFail));
        }
    } catch (error) {
        yield put(shoppingActions.clearCartInfoFail(error))
    }
}

export default [
  takeEvery(actions.GET_CART_INFO, getCustomerCartCommodityInfo),
  takeEvery(actions.UPDATE_CART_INFO, updateCustomerCartCommodity),
  takeEvery(actions.CLEAR_CAR, clearShoppingCar),
  takeEvery(actions.GET_COMMODITY_CLASS, getCommodityClass),
]
