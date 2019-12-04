/**
 * auth-action.js
 */

import * as actions from "../actions/action-types";

// login
export function login(username, password) {
  return {
    type: actions.LOGIN_ACTION,
    username: username,
    password: password
  }
}

export function setLoginSuccess(sessionId, username, password,mobilePhone, customerInfo) {
  return {
    type: actions.LOGIN_SUCCESS,
    sessionId: sessionId,
    username: username,
    password: password,
    mobilePhone:mobilePhone,
    customerInfo: customerInfo,
  }
}

export function setLoginError(error) {
  return {
    type: actions.LOGIN_ERROR,
    error: error
  }
}

export function resetLoginStatus() {
  return {
    type: actions.RESET_LOGIN_STATUS,
  }
}

// register
export function register(username, telephone, password) {
  return {
    type: actions.REGISTER_ACTION,
    username: username,
    telephone: telephone,
    password: password
  }
}

export function setRegisterError(error) {
  return {
    type: actions.REGISTER_ERROR,
    error: error
  }
}

export function resetRegisterStatus() {
  return {
    type: actions.RESET_REGISTER_STATUS,
  }
}

export function setRegisterSuccess(username, password) {
  return {
    type: actions.REGISTER_SUCCESS,
    username: username,
    password: password,
  }
}

// customer
export function setCustomerDefaultMerchant(unionId, merchantId) {
  return {
    type: actions.SET_DEFAULT_MERCHANT,
    unionId: unionId,
    merchantId: merchantId,
  }
}

export function setCustomerCart(cartId) {
  return {
    type: actions.SET_CUSTOMER_CART,
    cartId: cartId,
  }
}

export function addReceiverInfo(addType, addValue) {
  return {
    type: actions.ADD_RECEIVER_INFO,
    addType: addType,
    addValue: addValue,
  }
}

export function addReceiverInfoSuccess(customerInfo) {
  return {
    type: actions.ADD_RECEIVER_INFO_SUCCESS,
    customerInfo: customerInfo,
  }
}

export function addReceiverInfoFail(error) {
  return {
    type: actions.ADD_RECEIVER_INFO_FAIL,
    error: error,
  }
}

// logout
export function logout(authId, username, password) {
  return {
    type: actions.LOGOUT_ACTION,
    authId: authId,
    username: username,
    password: password
  }
}

export function setLogoutSuccess() {
  return {type: actions.LOGOUT_SUCCESS}
}

export function setLogoutError(error) {
  return {
    type: actions.LOGOUT_ERROR,
    error: error
  }
}

export function resetAuthResponse(){
  return {
    type: actions.RESET_AUTH_RESPONSE,
  }
}

export function resetAuth(){
  return {
    type: actions.RESET_AUTH,
  }
}
