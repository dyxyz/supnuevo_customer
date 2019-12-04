/**
 * union-actions.js
 */

import * as actions from "../actions/action-types";

// 联盟列表
export function getUnionList() {
  return {
    type: actions.GET_UNION_LIST_ACTION,
  };
}

export function getUnionListSuccess(unions) {
  return {
    type: actions.GET_UNION_LIST_SUCCESS,
    unions: unions,
  }
}

export function getUnionListFail(error) {
  return {
    type: actions.GET_UNION_LIST_FAIL,
    error: error
  }
}

export function setDefaultUnionAndMerchant(union, merchant){
  return{
    type: actions.SET_DEFAULT_UNION_AND_MERCHANT,
    union: union,
    merchant: merchant
  }
}

// 联盟成员
export function getUnionMemberList(unionId,username,password) {
  return {
    type: actions.GET_UNION_MEMBER_LIST_ACTION,
    unionId: unionId,
    username:username,
    password:password,
  };
}

//获取customer当前联盟下的购物车状态
export function getSupnuevoUnionCustomerShoppingCar(unionId) {
    return {
        type: actions.GET_UNION_CUSTOMER_SHOPPING_CAR,
        unionId: unionId
    };
}

export function getCustomerShoppingCarSuccess(cartId,unionId) {
    return {
        type: actions.GET_UNION_CUSTOMER_SHOPPING_CAR_SUCCESS,
        cartId:cartId,
        unionId:unionId,
        // merchants: merchants,
        // edges: edges,
    }
}

export function getCustomerShoppingCarFail(error) {
    return {
        type: actions.GET_UNION_CUSTOMER_SHOPPING_CAR_FAIL,
        error: error
    }
}

export function getUnionMemberListSuccess(merchants, edges) {
  return {
    type: actions.GET_UNION_MEMBER_LIST_SUCCESS,
    merchants: merchants,
    edges: edges,
  }
}

export function getUnionMemberListFail(error) {
  return {
    type: actions.GET_UNION_MEMBER_LIST_FAIL,
    error: error
  }
}

// 折扣广告
export function getUnionAdvertisementList(unionId, start, count) {
  return {
    type: actions.GET_ADVERTISEMENT_LIST,
    unionId: unionId,
    start: start,
    count: count,
  };
}

// 价格表
export function getUnionPriceList(unionId, start, count,cartId) {
  return {
    type: actions.GET_PRICE_LIST,
    unionId: unionId,
    start: start,
    count: count,
    cartId:cartId,
  };
}

export function getUnionPriceListLucene(unionId, userInput, start ,count) {
  return {
    type: actions.GET_PRICE_LIST_LUCENE,
    unionId: unionId,
    userInput: userInput,
    start: start,
    count: count,
  };
}

export function getUnionPriceListLuceneSuccess(priceList ) {
  return {
    type: actions.GET_PRICE_LIST_LUCENE_SUCCESS,
    priceList: priceList,
  }
}

export function getUnionPriceListLuceneFail(error ) {
  return {
    type: actions.GET_PRICE_LIST_LUCENE_FAIL,
    error: error,
  }
}

// 规则
export function getUnionRegulation(unionId) {
  return {
    type: actions.GET_UNION_REGULATION,
    unionId: unionId,
  };
}

export function getUnionRegulationSuccess(regulation) {
  return {
    type: actions.GET_UNION_REGULATION_SUCCESS,
    regulation: regulation,
  };
}

export function getUnionRegulationFail(error) {
  return {
    type: actions.GET_UNION_REGULATION_FAIL,
    error: error,
  };
}

//Common
export function setUnionResponse(type,data) {
  return{
    type: type,
    data: data,
  }
}

export function resetUnionResponse() {
  return{
    type: actions.RESET_UNION_RESPONSE,
  }
}



