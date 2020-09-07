/**
 * order-actions.js
 */

import * as actions from "../actions/action-types";

export function submitOrder (deliveryInfo) {
  return {
    type: actions.SUBMIT_ORDER_INFO,
    deliveryInfo: deliveryInfo
  };
}

export function submitOrderSuccess(newCarId) {
  return {
    type: actions.SUBMIT_ORDER_INFO_SUCCESS,
    newCarId:newCarId,
  };
}

export function submitOrderFail(error) {
  return {
    type: actions.SUBMIT_ORDER_INFO_FAIL,
    error: error,
  };
}

export function getOrderPrevInfo () {
  return {
    type: actions.GET_PREV_ORDER,
  };
}

export function getOrderPrevInfoSuccess(orderItemList, discountItemList, totalFee, discountFee, totalFeeFinal,isDiscountScale,isOrderMinLimit,noDiscountTotal,orderDiscountFee,orderDiscountScale,totalDiscount) {
  return {
    type: actions.GET_PREV_ORDER_SUCCESS,
    orderItemList: orderItemList,
    discountItemList: discountItemList,
    totalFee: totalFee,
    discountFee: discountFee,
    totalFeeFinal: totalFeeFinal,
    isDiscountScale:isDiscountScale,
    isOrderMinLimit:isOrderMinLimit,
    noDiscountTotal:noDiscountTotal,
    orderDiscountFee:orderDiscountFee,
    orderDiscountScale:orderDiscountScale,
    totalDiscount:totalDiscount,
  };
}

export function getOrderPrevInfoFail(error) {
  return {
    type: actions.GET_PREV_ORDER_FAIL,
    error: error,
  };
}

export function getOrderListOfDate (orderDate,orderState) {
  return {
    type: actions.GET_ORDER_LSIT,
    orderDate: orderDate,
    orderState:orderState,
  };
}

export function getOrderListSuccess(orderList) {
  return {
    type: actions.GET_ORDER_LIST_SUCCESS,
    orderList: orderList
  };
}

export function getOrderListFail(error) {
  return {
    type: actions.GET_ORDER_LIST_FAIL,
    error: error,
  };
}

export function resetOrderResponse() {
  return {
    type: actions.RESET_ORDER_RESPONSE,
  }
}

export function resetRecallState() {
    return {
        type: actions.RESET_RECALL_STATE,
    }
}

export function cancelOrder (orderId) {
    return {
        type: actions.CANCEL_ORDER,
        orderId: orderId
    };
}

export function recallCar (orderId,itemList,totalFee,totalFeeFinal,discountItemList,discountFee,cartId,unionId) {
    return {
        type: actions.RECALL_CAR,
        orderId: orderId,
        itemList:itemList,
        totalFee:totalFee,
        totalFeeFinal:totalFeeFinal,
        discountItemList:discountItemList,
        discountFee:discountFee,
        cartId:cartId,
        unionId:unionId
    };
}

export function recallCarSuccess() {
    return {
        type: actions.RECALL_CAR_SUCCESS,
    };
}

export function recallCarFail(error) {
    return {
        type: actions.RECALL_CAR_FAIL,
        error: error,
    };
}

export function cancelCustomerOrderSuccess() {
    return {
        type: actions.CANCEL_ORDER_SUCCESS,
    };
}

export function cancelCustomerOrderFail(error) {
    return {
        type: actions.CANCEL_ORDER_FAIL,
        error: error,
    };
}

export function sendVerifyCode (verifyTel,verifyCode) {
    return {
        type: actions.SEND_VERIFY_CODE,
        verifyTel:verifyTel,
        verifyCode: verifyCode,
    };
}

export function setCustomerPhoneChecked (verifyTel) {
    return {
        type: actions.SET_CHECKED,
        verifyTel:verifyTel,
    };
}

export function getHistoryCarList() {
    return {
        type: actions.GET_HISTORY_CAR,
    };
}

export function getHistoryCarListSuccess(carList) {
    return {
        type: actions.GET_HISTORY_CAR_SUCCESS,
        carList:carList,
    };
}

export function getHistoryCarListFail(error) {
    return {
        type: actions.GET_HISTORY_CAR_FAIL,
        error: error,
    };
}







