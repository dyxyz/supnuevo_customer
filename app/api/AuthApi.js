/**
 * AuthApi.js
 * 登录数据请求接口
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 登录
export function webLogin (username, password) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/auth/webLogin';
  const body = {
    loginName: username,
    password: password,
  };

  return post(url ,body);
}

// 获取登录客户的信息
export function getSupnuevoCustomerInfo (session) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getSupnuevoCustomerInfo';
  const body = {
    session: session
  };

  return post(url ,body);
}

// 设置用户初始超市
export function setCustomerDefaultMerchant (unionId, merchantId) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/setCustomerDefaultMerchant';
  const body = {
    unionId: unionId,
    merchantId: merchantId,
  };

  return post(url ,body);
}

// 注册
export function supnuevoCustomerRegister (username, telephone, password) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/supnuevoCustomerRegister';
  const body = {
    nickName: username,
    telephone: telephone,
    password: password,
  };

  return post(url ,body);
}

// 跨服务器访问
export function loginAfterOtherServerAuthed (auth) {
  const url = constants.SUPNUEVO_VENTAS_BASE_URL + '/func/auth/loginAfterOtherServerAuthed';
  const body = {
    loginName: auth.username,
    password: auth.password,
    motherServerSessionId: auth.sessionId,
  };

  return post(url ,body);
}

// 增加订单配送信息
export function addCustomerReceiverInfo (addType, addValue) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/addCustomerReceiverInfo';
  const body = {
    addType: addType,
    addValue: addValue,
  };

  return post(url ,body);
}

// 登出
export function logOut () {
  const url = constants.SUPNUEVO_BASE_URL + '/func/auth/webLogout';
  const body = {};

  return post(url ,body);
}
