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

export function getOrderPrevInfoSuccess(orderItemList, discountItemList, totalFee, discountFee, totalFeeFinal) {
  return {
    type: actions.GET_PREV_ORDER_SUCCESS,
    orderItemList: orderItemList,
    discountItemList: discountItemList,
    totalFee: totalFee,
    discountFee: discountFee,
    totalFeeFinal: totalFeeFinal,
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
