/**
 * AuthApi.js
 * 登录数据请求接口
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer ,getDeviceId} from 'react-native-device-info';
let deviceId = DeviceInfo.getUniqueId();
let deviceName = DeviceInfo.getDeviceId();


export function getCustomerHelp (helpNum) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getSupnuevoCustomerHelpListByHelpNum';
    const body = {
        helpNum:helpNum,
    };

    return post(url ,body);
}

export function getDeviceInfo (username) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getCustomerServoiceInfo';
    const body = {
        loginName: username,
    };

    return post(url ,body);
}

// 登录
export function webLogin (username, password) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/auth/webLoginPhoneApp';
  const body = {
    loginName: username,
    password: password,
    parameter: {serviceId: deviceId,loginAnnotation:null,appDeviceType:deviceName},
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

// 删除订单配送信息
export function deleteCustomerReceiverInfo (deleteType, deleteValue) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/deleteCustomerReceiverInfo';
    const body = {
        deleteType: deleteType,
        deleteValue: deleteValue,
    };

    return post(url ,body);
}

// 登出
// export function logOut () {
//   const url = constants.SUPNUEVO_BASE_URL + '/func/auth/webLogout';
//   const body = {};
//
//   return post(url ,body);
// }

// 设置已读条款
export function setReadState(isAgree) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/setCustomerIsAgree';
    const body = {
        isAgree:isAgree
    };

    return post(url ,body);
}


