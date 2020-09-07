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

export function getCartInfoSuccess(cartInfo,goodsNumber) {
  return {
    type: actions.GET_CART_INFO_SUCCESS,
    cartInfo: cartInfo,
    goodsNumber:goodsNumber,
  };
}

export function getCartInfoFail(error) {
  return {
    type: actions.GET_CART_INFO_FAIL,
    error: error,
  };
}

export function getCommodityClass(unionId) {
    return {
        type: actions.GET_COMMODITY_CLASS,
        unionId:unionId,
    };
}

export function getCommodityClassSuccess(classList) {
    return {
        type: actions.GET_COMMODITY_CLASS_SUCCESS,
        classList:classList,
    };
}

export function getCommodityClassFail() {
    return {
        type: actions.GET_COMMODITY_CLASS_FAIL,
    };
}

export function setCartInfo(cartInfo) {
  return {
    type: actions.SET_CART_INFO,
    cartInfo: cartInfo,
  };
}

export function updateCartInfo(cartInfo, unionId,searchText,detail,taxId) {
  return {
    type: actions.UPDATE_CART_INFO,
    cartInfo:cartInfo,
    unionId: unionId,
    searchText:searchText,
    detail:detail,
    taxId:taxId
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
