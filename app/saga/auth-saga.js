/**
 * auth-saga.js
 */

import  {Alert} from 'react-native'
import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/AuthApi";
import * as unionActions from "../actions/union-actions";
import * as authActions from "../actions/auth-actions";
import * as rootActions from "../actions/root-actions";
import strings from '../resources/strings';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer ,getDeviceId} from 'react-native-device-info';
let deviceId = DeviceInfo.getUniqueId();



// 获取客户帮助信息
function* getCustomerHelp (action) {
    try {
        const helpNum=action.helpNum;
        const response = yield call(Api.getCustomerHelp,helpNum);
        // console.log(response)
        if (response.re == 1) {
            const helpSeg = response.data.helpSeg;

          if(helpNum=='01') {
              yield put(authActions.getCustomerHelpSuccess(helpSeg));
          }
          else if(helpNum=='02'){
              yield put(authActions.getRootHelpSuccess(helpSeg));
          }
          else if(helpNum=='03'){
              yield put(authActions.getUnionHelpSuccess(helpSeg));
          }
          else if(helpNum=='04'){
              yield put(authActions.getShoppingHelpSuccess(helpSeg));
          }
          else if(helpNum=='05'){
              yield put(authActions.getOrderHelpSuccess(helpSeg));
          }
          else{
              yield put(authActions.getHistoryHelpSuccess(helpSeg));
          }
        }
        else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(authActions.getCustomerHelpFail(strings.getCustomerHelpFail));
        }
    } catch (error) {
        yield put(authActions.getCustomerHelpFail(error));
    }
}

function* login( action ) {
    const {username,password} = action;
    try {
        yield put({type:actions.RESET_DEVICE_STATUS})


        const loginResponse = yield call(Api.webLogin, deviceId, 1);
        console.log(loginResponse)
        if (loginResponse.dataMap && loginResponse.dataMap!=undefined) {
            // yield put(authActions.setLoginError(loginResponse.errorMessageList[1]));
            Alert.alert(strings.alertTitle,loginResponse.dataMap.alert);
            return
        } else {
            yield put(rootActions.setLoading(true));
            const sessionId = loginResponse.sessionId;
            const customerResponse = yield call(Api.getSupnuevoCustomerInfo, sessionId);
            console.log(customerResponse)
            if(customerResponse.re === 1) {
                const data = customerResponse.data;
                const customerInfo = data.customerInfo;
                const merchant = data.merchant;
                const union = data.union;
                const mobilePhone=data.mobilePhone;
                const phoneChecked=data.phoneChecked;
                const isAgree=data.isAgree;

                yield put(authActions.setLoginSuccess(sessionId, username, password,mobilePhone, customerInfo,phoneChecked,isAgree));
                yield put(unionActions.setDefaultUnionAndMerchant(union,merchant));
            }
            else{
                Alert.alert(strings.alertTitle,strings.time_out);
                yield put(authActions.setLoginError(strings.customer_invalid));
            }

        }
    } catch (error) {
        yield put(authActions.setLoginError(error));
    } finally {
        yield put(rootActions.setLoading(false));
    }
}
function* continueLogin( action ) {
    const {username,password} = action;
    try {
        yield put({type:actions.RESET_DEVICE_STATUS})
        yield put(rootActions.setLoading(true));
        const loginResponse = yield call(Api.webLogin, deviceId, 1);
        console.log(loginResponse)
        if (loginResponse.errorMessageList && loginResponse.errorMessageList.length > 0) {
            yield put(authActions.setLoginError(loginResponse.errorMessageList[1]));
        } else {
            const sessionId = loginResponse.sessionId;
            const customerResponse = yield call(Api.getSupnuevoCustomerInfo, sessionId);
            console.log(customerResponse)
            if(customerResponse.re === 1) {
                const data = customerResponse.data;
                const customerInfo = data.customerInfo;
                const merchant = data.merchant;
                const union = data.union;
                const mobilePhone=data.mobilePhone;
                yield put(authActions.setLoginSuccess(sessionId, username, password,mobilePhone, customerInfo));
                yield put(unionActions.setDefaultUnionAndMerchant(union,merchant));
            }
            else{
                Alert.alert(strings.alertTitle,strings.time_out);
                yield put(authActions.setLoginError(strings.customer_invalid));
            }

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
        Alert.alert(strings.alertTitle,strings.time_out);
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
  console.log(addValue)
  try {
    const response = yield call(Api.addCustomerReceiverInfo, addType, addValue);
    if (response.re === 1) {
      console.log(response)
      const customerInfo = response.data;
      yield put(authActions.addReceiverInfoSuccess(customerInfo));
    } else {
        Alert.alert(strings.alertTitle,strings.time_out);
      yield put(authActions.addReceiverInfoFail(strings.addCustomerReceiverInfoFail));
    }
  } catch (error) {
    yield put(authActions.addReceiverInfoFail(error));
  }
}

function* deleteCustomerReceiverInfo( action ) {
    const {deleteType, deleteValue} = action;
    console.log(deleteValue)
    try {
        const response = yield call(Api.deleteCustomerReceiverInfo, deleteType, deleteValue);
        if (response.re === 1) {
            console.log(response)
            const customerInfo = response.data;
            yield put(authActions.addReceiverInfoSuccess(customerInfo));
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(authActions.addReceiverInfoFail(strings.deleteCustomerReceiverInfoFail));
        }
    } catch (error) {
        yield put(authActions.addReceiverInfoFail(error));
    }
}

// function* logOut() {
//   try {
//     const response = yield call(Api.logOut);
//     if (response.errorMessageList && response.errorMessageList.length > 0) {
//       yield put(authActions.setLogoutError(response.errorMessageList[1]));
//     } else {
//       yield put(authActions.setLogoutSuccess());
//     }
//   } catch (error) {
//     yield put(authActions.setLogoutError(error));
//   }
// }

function* setCustomerIsAgree(action) {
    const {isAgree} = action;
    try {

        const response = yield call(Api.setReadState, isAgree);
        console.log(response)
        if (response.re === 1) {
            if(isAgree==1){
                yield put({ type: actions.SET_AGREE_SUCCESS });
            }
            else{
                yield put({ type: actions.SET_DISAGREE_SUCCESS });
            }

        }
        else{
            Alert.alert(strings.alertTitle,strings.time_out);
        }
    } catch (error) {
    }
}



export default [
  takeEvery(actions.GET_CUSTOMER_HELP,getCustomerHelp),
  takeEvery(actions.LOGIN_ACTION,login),
  takeEvery(actions.CONTINUE_LOGIN,continueLogin),
  takeEvery(actions.REGISTER_ACTION,register),
  takeEvery(actions.SET_DEFAULT_MERCHANT,setCustomerDefaultMerchant),
  takeEvery(actions.ADD_RECEIVER_INFO,addCustomerReceiverInfo),
  takeEvery(actions.DELETE_RECEIVER_INFO,deleteCustomerReceiverInfo),
  // takeEvery(actions.LOGOUT_ACTION,logOut),
  takeEvery(actions.SET_AGREE,setCustomerIsAgree),
]


