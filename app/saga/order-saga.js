/**
 * shopping-saga.js
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/OrderApi";
import * as orderActions from "../actions/order-actions";
import * as authActions from "../actions/auth-actions";
import strings from '../resources/strings';


// 获取当前订单
function* getSupnuevoCustomerOrderPrevInfo (action) {
  try {
    const response = yield call(Api.getSupnuevoCustomerOrderPrevInfo);
    if (response.re === 1) {
      const data = response.data;
      if(data==undefined || data==null || data==""){
          yield put(orderActions.getOrderPrevInfoSuccess(null, null, null, null, null));
      }
      else {
          const orderItemList = data.orderItemList;
          const discountItemList = data.discountItemList;
          const totalFee = data.totalFee;
          const discountFee = data.discountFee;
          const totalFeeFinal = data.totalFeeFinal;
          yield put(orderActions.getOrderPrevInfoSuccess(orderItemList, discountItemList, totalFee, discountFee, totalFeeFinal));
      }

    } else {
      yield put(orderActions.getOrderPrevInfoFail(strings.getPrevOrderFail));
    }
  } catch (error) {
    yield put(orderActions.getOrderPrevInfoFail(error));
  }
}

// 获取订单列表
function* getSupnuevoCustomerOrderListOfDate (action) {
  const {orderDate,orderState} = action
  try {
    const response = yield call(Api.getSupnuevoCustomerOrderListOfDate, orderDate,orderState);
    if (response.re === 1) {
      const orderList = response.data;
      yield put(orderActions.getOrderListSuccess(orderList));
    } else {
      yield put(orderActions.getOrderListFail(strings.getOrderListFail));
    }
  } catch (error) {
    yield put(orderActions.getOrderListFail(error))
  }
}

// 提交订单
function* submitSupnuevoCustomerOrder (action) {
  const {deliveryInfo} = action;
  try {
    const response = yield call(Api.submitSupnuevoCustomerOrder, deliveryInfo);
    if (response.re === 1) {
      const newCarId= response.data;
      yield put(orderActions.submitOrderSuccess(newCarId));
    } else {
      yield put(orderActions.submitOrderFail(strings.submitOrderFail));
    }
  } catch (error) {
    yield put(orderActions.submitOrderFail(error))
  }
}

// 取消订单
function* cancelCustomerOrder (action) {
    const {orderId} = action;
    try {
        const response = yield call(Api.cancelCustomerOrder, orderId);
        if (response.re === 1) {
            yield put(orderActions.cancelCustomerOrderSuccess(strings.submitOrderSuccess));
            yield put(orderActions.getOrderListOfDate(null,0));
        }

        else {
            yield put(orderActions.cancelCustomerOrderFail(strings.submitOrderFail));
        }
    } catch (error) {
        yield put(orderActions.cancelCustomerOrderFail(error))
    }
}

// 回退订单到购物车
function* recallOrderToCar (action) {
    const {orderId,cartId} = action;
    try {
        const response = yield call(Api.recallCar, orderId,cartId);
        if (response.re === 1) {

            yield put(orderActions.getOrderListOfDate(null,0));
        }

        else {
            yield put(orderActions.recallCarFail(strings.submitOrderFail));
        }
    } catch (error) {
        yield put(orderActions.recallCarFail(strings.submitOrderFail))
    }
}
export default [
  takeEvery(actions.GET_PREV_ORDER, getSupnuevoCustomerOrderPrevInfo),
  takeEvery(actions.GET_ORDER_LSIT, getSupnuevoCustomerOrderListOfDate),
  takeEvery(actions.SUBMIT_ORDER_INFO, submitSupnuevoCustomerOrder),
  takeEvery(actions.CANCEL_ORDER, cancelCustomerOrder),
  takeEvery(actions.RECALL_CAR, recallOrderToCar),
]
