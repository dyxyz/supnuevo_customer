/**
 * shopping-saga.js
 */

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
  try {
    const response = yield call(Api.getCustomerCartCommodityInfo, cartId,unionId);
    if (response.re === 1) {
      const cartId = response.data.cartId;
      const cartInfo = response.data.itemList;
      yield put(authActions.setCustomerCart(cartId));
      yield put(shoppingActions.getCartInfoSuccess(cartInfo));
      console.log(cartInfo.length)
    } else {
      yield put(shoppingActions.getCartInfoFail(strings.getCartInfoFail));
    }
  } catch (error) {
    yield put(shoppingActions.getCartInfoFail(error));
  }
}

// 更新购物车列表
function* updateCustomerCartCommodity (action) {
  const {cartInfo, unionId} = action;
  try {
    const response = yield call(Api.updateCustomerCartCommodity, cartInfo.itemId, cartInfo.commodityId, cartInfo.amount, unionId);
    if (response.re === 1) {
      const cartInfoItem = response.data;
      yield put(shoppingActions.updateCartInfoSuccess(cartInfoItem));
      yield put(unionActions.getUnionPriceList(unionId, 0, count,cartInfo.cartId));
      console.log(cartInfo)
    } else {
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
]
