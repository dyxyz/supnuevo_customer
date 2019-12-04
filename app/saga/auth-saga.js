/**
 * auth-saga.js
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/AuthApi";
import * as unionActions from "../actions/union-actions";
import * as authActions from "../actions/auth-actions";
import * as rootActions from "../actions/root-actions";
import strings from '../resources/strings';

function* login( action ) {
  const {username,password} = action;

  try {
    yield put(rootActions.setLoading(true));
    const loginResponse = yield call(Api.webLogin, username, password);
    if (loginResponse.errorMessageList && loginResponse.errorMessageList.length > 0) {
      yield put(authActions.setLoginError(loginResponse.errorMessageList[1]));
    } else {
      const sessionId = loginResponse.sessionId;
      const customerResponse = yield call(Api.getSupnuevoCustomerInfo, sessionId);
      if(customerResponse.re === 1) {
        const data = customerResponse.data;
        const customerInfo = data.customerInfo;
        const merchant = data.merchant;
        const union = data.union;
        const mobilePhone=data.mobilePhone;
        yield put(authActions.setLoginSuccess(sessionId, username, password,mobilePhone, customerInfo));
        yield put(unionActions.setDefaultUnionAndMerchant(union,merchant));
      }
      else
        yield put(authActions.setLoginError(strings.customer_invalid));
    }
  } catch (error) {
    yield put(authActions.setLoginError(error));
  } finally {
    yield put(rootActions.setLoading(false));
  }
}

function* register( action ) {
  const {username,password,telephone} = action;

  try {
    yield put(rootActions.setLoading(true));
    const registerResponse = yield call(Api.supnuevoCustomerRegister, username, telephone, password);
    if (registerResponse.re === 1) {
      yield put(authActions.setRegisterSuccess(username, password));
    } else {
      const error = registerResponse.data;
      yield put(authActions.setRegisterError(error && error !== undefined?error:strings.register_fail));
    }
  } catch (error) {
    yield put(authActions.setRegisterError(error));
  } finally {
    yield put(rootActions.setLoading(false));
  }
}

function* setCustomerDefaultMerchant( action ) {
  const {unionId, merchantId} = action;
  try {
    yield call(Api.setCustomerDefaultMerchant, unionId, merchantId);
  } catch (error) {}
}

function* addCustomerReceiverInfo( action ) {
  const {addType, addValue} = action;
  try {
    const response = yield call(Api.addCustomerReceiverInfo, addType, addValue);
    if (response.re === 1) {
      const customerInfo = response.data;
      yield put(authActions.addReceiverInfoSuccess(customerInfo));
    } else {
      yield put(authActions.addReceiverInfoFail(strings.addCustomerReceiverInfoFail));
    }
  } catch (error) {
    yield put(authActions.addReceiverInfoFail(error));
  }
}

function* logOut() {
  try {
    const response = yield call(Api.logOut);
    if (response.errorMessageList && response.errorMessageList.length > 0) {
      yield put(authActions.setLogoutError(response.errorMessageList[1]));
    } else {
      yield put(authActions.setLogoutSuccess());
    }
  } catch (error) {
    yield put(authActions.setLogoutError(error));
  }
}

export default [
  takeEvery(actions.LOGIN_ACTION,login),
  takeEvery(actions.REGISTER_ACTION,register),
  takeEvery(actions.SET_DEFAULT_MERCHANT,setCustomerDefaultMerchant),
  takeEvery(actions.ADD_RECEIVER_INFO,addCustomerReceiverInfo),
  takeEvery(actions.LOGOUT_ACTION,logOut),
]


