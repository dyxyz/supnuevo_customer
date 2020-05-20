/**
 * shopping-actions.js
 */

import * as actions from "../actions/action-types";

export function getCartInfo(cartId,unionId) {
  return {
    type: actions.GET_CART_INFO,
    cartId: cartId,
    unionId:unionId,
  };
}

export function getCartInfoSuccess(cartInfo) {
  return {
    type: actions.GET_CART_INFO_SUCCESS,
    cartInfo: cartInfo,
  };
}

export function getCartInfoFail(error) {
  return {
    type: actions.GET_CART_INFO_FAIL,
    error: error,
  };
}

export function setCartInfo(cartInfo) {
  return {
    type: actions.SET_CART_INFO,
    cartInfo: cartInfo,
  };
}

export function updateCartInfo(cartInfo, unionId) {
  return {
    type: actions.UPDATE_CART_INFO,
    cartInfo:cartInfo,
    unionId: unionId
  };
}

export function updateCartInfoSuccess(cartInfoItem) {
  return {
    type: actions.UPDATE_CART_INFO_SUCCESS,
    cartInfoItem:cartInfoItem,
  };
}

export function updateCartInfoFail(error) {
  return {
    type: actions.UPDATE_CART_INFO_FAIL,
    error: error,
  };
}

export function clearCartInfo(cartId,unionId) {
    return {
        type: actions.CLEAR_CAR,
        cartId:cartId,
        unionId:unionId,
    };
}


export function clearCartInfoFail(error) {
    return {
        type: actions.CLEAR_CAR_FAIL,
        error: error,
    };
}

export function resetShoppingResponse() {
  return{
    type: actions.RESET_SHOPPING_RESPONSE,
  }
}
