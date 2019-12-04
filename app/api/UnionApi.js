/**
 * UnionApi.js
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 获取所有联盟列表
export function getUnionList () {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/getSupnuevoBuyerUnionList';
  const body = {};

  return post(url ,body);
}

//获取customer当前联盟下的购物车状态
export function getSupnuevoUnionCustomerShoppingCar (unionId) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getSupnuevoUnionCustomerShoppingCar';
    const body = {
        unionId:unionId
    };

    return post(url ,body);
}

// 获取联盟内成员列表
export function getUnionMemberList (unionId) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/getSupnuevoBuyerUnionMemberFormList';
  const body = {
    unionId:unionId
  };

  return post(url ,body);
}

// 获取折扣广告
export function getSupnuevoBuyerUnionAdvertisementList(unionId, start, count) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/getSupnuevoBuyerUnionAdvertisementList';
  const body = {
    unionId: unionId,
    start: start,
    count: count,
  };

  return post(url ,body);
}

// 获取价格表
export function getSupnuevoBuyerUnionPriceList(unionId, start, count,cartId) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/getSupnuevoBuyerUnionPriceListCustomer';
  const body = {
    unionId: unionId,
    start: start,
    count: count,
    cartId:cartId,
  };

  return post(url ,body);
}

// 搜索引擎获取价格表
export function getSupnuevoBuyerUnionPriceListLucene(unionId, userInput, start, count) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/getSupnuevoBuyerUnionPriceListLucene';
  const body = {
    unionId: unionId,
    userInput: userInput,
    start: start,
    count: count,
  };

  return post(url ,body);
}

// 获取联盟规则
export function getSupnuevoBuyerUnionRegulationInfo (unionId) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/getSupnuevoBuyerUnionRegulationInfo';
  const body = {
    unionId:unionId
  };

  return post(url ,body);
}
