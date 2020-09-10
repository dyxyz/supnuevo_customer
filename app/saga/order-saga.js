/**
 * shopping-saga.js
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/OrderApi";
import * as orderActions from "../actions/order-actions";
import * as shoppingActions from "../actions/shopping-actions";
import * as authActions from "../actions/auth-actions";
import * as unionActions from "../actions/union-actions";
import strings from '../resources/strings';


// 获取当前订单
function* getSupnuevoCustomerOrderPrevInfo (action) {
  try {
    const response = yield call(Api.getSupnuevoCustomerOrderPrevInfo);
    console.log(response)
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
          const totalDiscount = data.totalDiscount;
          const totalFeeFinal = data.totalFeeFinal;
          const isDiscountScale = data.isDiscountScale;
          const isOrderMinLimit = data.isOrderMinLimit;
          const noDiscountTotal = data.noDiscountTotal;
          const orderDiscountFee = data.orderDiscountFee;
          const orderDiscountScale = data.orderDiscountScale;

          yield put(orderActions.getOrderPrevInfoSuccess(orderItemList, discountItemList, totalFee, discountFee, totalFeeFinal,isDiscountScale,isOrderMinLimit,noDiscountTotal,orderDiscountFee,orderDiscountScale,totalDiscount));
      }

    } else {
        alert(strings.time_out);
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
    const response1 = yield call(Api.getSupnuevoCustomerOrderListOfDate, orderDate,1);

    if (response.re === 1) {
      const orderList1 = response.data;
        const orderList2 = response1.data;
        var orderList=null
        if(orderState==0){
            orderList = orderList1.concat(orderList2);
        }
        else{
            orderList= response.data
        }
      yield put(orderActions.getOrderListSuccess(orderList));
    } else {
        alert(strings.time_out);
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
        alert(strings.time_out);
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
            alert(strings.time_out);
            yield put(orderActions.cancelCustomerOrderFail(strings.submitOrderFail));
        }
    } catch (error) {
        yield put(orderActions.cancelCustomerOrderFail(error))
    }
}

// 回退订单到购物车
function* recallOrderToCar (action) {
    const {orderId,itemList,totalFee,totalFeeFinal,discountItemList,discountFee,cartId,unionId} = action;
    try {
        const response = yield call(Api.recallCar, orderId,cartId,unionId);
        console.log(response)
        if (response.re === 1) {

            yield put(orderActions.getOrderListOfDate(null,0));
            yield put(unionActions.getSupnuevoUnionCustomerShoppingCar(unionId));
            yield put(unionActions.getUnionPriceList(unionId, 0, 10,cartId));
            yield put(shoppingActions.getCartInfo(cartId,unionId));
            yield put(orderActions.recallCarSuccess());
            // yield put(orderActions.recallCarSuccess(itemList,totalFee,totalFeeFinal,discountItemList,discountFee));
        }

        else {
            alert(strings.time_out);
            yield put(orderActions.recallCarFail(strings.submitOrderFail));
            // alert(strings.submitOrderFail)
        }

    } catch (error) {
        yield put(orderActions.recallCarFail(strings.submitOrderFail))
    }
}


// 发送验证码
function* sendVerifyCode (action) {
    const {verifyCode,verifyTel} = action;
    try {
        const response = yield call(Api.sendVerifyCode, verifyCode,verifyTel);
        // if (response.re === 1) {
        //
        //     yield put(orderActions.getOrderListOfDate(null,0));
        //     yield put(unionActions.getUnionPriceList(unionId, 0, 10,cartId));
        //     yield put(shoppingActions.getCartInfo(cartId,unionId));
        // }


    } catch (error) {

    }
}

// 将用户置为已验证
function* setCustomerPhoneChecked (action) {
    const {verifyTel} = action;
    try {
        const response = yield call(Api.setCustomerPhoneChecked, verifyTel);
        if (response.re === 1) {
            // yield put({type:actions.SET_CHECKED_SUCCESS})
            yield put(authActions.setCustomerPhoneCheckedSuccess(verifyTel));
        }
        else{
            alert(strings.time_out);
        }


    } catch (error) {

    }
}

// 获取历史购物车列表
function* getHistoryCarList (action) {
    try {
        const response = yield call(Api.getHistoryCarList);
        if (response.re === 1) {
            console.log(response)
            const carList = response.data;
            yield put(orderActions.getHistoryCarListSuccess(carList));

        } else {
            alert(strings.time_out);
            yield put(orderActions.getHistoryCarListFail(strings.getHistoryCarFail));
        }
    } catch (error) {
        yield put(orderActions.getHistoryCarListFail(error));
    }
}


export default [
  takeEvery(actions.GET_PREV_ORDER, getSupnuevoCustomerOrderPrevInfo),
  takeEvery(actions.GET_ORDER_LSIT, getSupnuevoCustomerOrderListOfDate),
  takeEvery(actions.SUBMIT_ORDER_INFO, submitSupnuevoCustomerOrder),
  takeEvery(actions.CANCEL_ORDER, cancelCustomerOrder),
  takeEvery(actions.RECALL_CAR, recallOrderToCar),
  takeEvery(actions.SEND_VERIFY_CODE, sendVerifyCode),
  takeEvery(actions.SET_CHECKED, setCustomerPhoneChecked),
  takeEvery(actions.GET_HISTORY_CAR, getHistoryCarList),
]
