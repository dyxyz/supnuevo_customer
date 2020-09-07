/**
 * authReducer.js
 */

import * as actions from "../actions/action-types";
import constants from "../resources/constants";

export default function authReducer(state, action = {}) {
  switch (action.type) {
      case actions.GET_CUSTOMER_HELP_SUCCESS:
          return state.withMutations(state => state
              .set('helpSeg', action.helpSeg));
      case actions.GET_ROOT_HELP_SUCCESS:
          return state.withMutations(state => state
              .set('rootHelpSeg', action.helpSeg));
      case actions.GET_UNION_HELP_SUCCESS:
          return state.withMutations(state => state
              .set('unionHelpSeg', action.helpSeg));
      case actions.GET_SHOPPING_HELP_SUCCESS:
          return state.withMutations(state => state
              .set('shoppingHelpSeg', action.helpSeg));
      case actions.GET_ORDER_HELP_SUCCESS:
          return state.withMutations(state => state
              .set('orderHelpSeg', action.helpSeg));
      case actions.GET_HISTORY_HELP_SUCCESS:
          return state.withMutations(state => state
              .set('historyHelpSeg', action.helpSeg));
      case actions.GET_CUSTOMER_HELP_FAIL:
          return state.withMutations(state => state
              .set('helpError', action.error));
    case actions.LOGIN_ERROR:
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('loginError', action.error));
    case actions.LOGIN_SUCCESS:
      return state.withMutations(state => state
          .set('isLoggedIn', true)
          .set('loginError', '')
          .set('sessionId', action.sessionId)
          .set('username', action.username)
          .set('password', action.password)
          .set('mobilePhone', action.mobilePhone)
          .set('unionId', action.customerInfo.unionId)
          .set('merchantId',action.customerInfo.merchantId)
          .set('cartId',action.customerInfo.cartId)
          .set('phoneChecked',action.phoneChecked)
          .set('isAgree',action.isAgree)
          .set('customerInfo',action.customerInfo));
    case actions.REGISTER_ERROR:
      return state.withMutations(state => state
          .set('isRegisterSuccess', false)
          .set('registerError', action.error));
    case actions.REGISTER_SUCCESS:
      return state.withMutations(state => state
          .set('isRegisterSuccess', true)
          .set('registerError','')
          .set('username', action.username)
          .set('password', action.password));
    case actions.RESET_REGISTER_STATUS:
      return state.withMutations(state => state
          .set('isRegisterSuccess', false)
          .set('registerError',''));
    case actions.RESET_LOGIN_STATUS:
      return state.withMutations(state => state
          .set('loginError',''));
    case actions.SET_DEFAULT_MERCHANT:
      return state.withMutations(state => state
          .set('unionId', action.unionId)
          .set('merchantId', action.merchantId));
    case actions.SET_CUSTOMER_CART:
      return state.withMutations(state => state
          .set('cartId', action.cartId));
    case actions.ADD_RECEIVER_INFO_SUCCESS:
      return state.withMutations(state => state
          .set('customerInfo', action.customerInfo)
          .set('dataResponse', action.type)
          .set('dataError', ''));
    case actions.ADD_RECEIVER_INFO_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', action.type)
          .set('dataError', action.error));
    case actions.LOGOUT_SUCCESS:
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('sessionId', '')
          .set('username', '')
          .set('password', ''));
    case actions.LOGOUT_ERROR:
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('loginError', action.error));
    case actions.RESET_AUTH_RESPONSE:
      return state.withMutations(state => state
          .set('dataResponse', constants.INITIAL)
          .set('dataError', ''));
    case actions.RESET_AUTH:
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('isNewDevice', false)
          .set('loginError','')
          .set('registerState',false)
          .set('sessionId', '')
          .set('username', '')
          .set('password', ''));
      case actions.NEW_DEVICE:
          return state.withMutations(state => state
              .set('isNewDevice', true));
      case actions.RESET_DEVICE_STATUS:
          return state.withMutations(state => state
              .set('isNewDevice', false));
      case actions.SET_CHECKED_SUCCESS:
          return state.withMutations(state => state
              .set('mobilePhone',action.verifyTel)
              .set('phoneChecked',1));
      case actions.SET_AGREE_SUCCESS:
          return state.withMutations(state => state
              .set('isAgree',1));
      case actions.SET_DISAGREE_SUCCESS:
          return state.withMutations(state => state
              .set('isAgree',0));
      case actions.SET_UNION:
          return state.withMutations(state => state
              .set('cartId',action.cartId)
              .set('unionId',action.unionId));
      case actions.SET_DEFAULT_INFO:
          return state.withMutations(state => state
              .set('customerInfo',Object.assign(state.get('customerInfo'),{defaultReceiverName: action.deliveryInfo.receiverName,defaultReceiverAddr: action.deliveryInfo.receiverAddr,defaultReceiverPhone: action.deliveryInfo.receiverPhone})));
    default:
      return state
  }
}
