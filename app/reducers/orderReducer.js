/**
 * orderReducer.js
 */

import * as actions from "../actions/action-types";
import constants from "../resources/constants";

export default function orderReducer(state, action = {}) {
  switch (action.type) {
    case actions.GET_PREV_ORDER_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_PREV_ORDER_SUCCESS)
          .set('dataError', '')
          .set('orderItemList', action.orderItemList)
          .set('discountItemList', action.discountItemList)
          .set('totalFee', action.totalFee)
          .set('discountFee', action.discountFee)
          .set('totalFeeFinal',action.totalFeeFinal));
    case actions.GET_PREV_ORDER_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_PREV_ORDER_FAIL)
          .set('dataError', action.error));
    case actions.GET_ORDER_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_ORDER_LIST_SUCCESS)
          .set('dataError', '')
          .set('orderList', action.orderList));
    case actions.GET_ORDER_LIST_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_ORDER_LIST_FAIL)
          .set('dataError', action.error));
    case actions.SUBMIT_ORDER_INFO_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.SUBMIT_ORDER_INFO_SUCCESS)
          .set('dataError', '')
          .set('cartId', action.newCarId));
    case actions.SUBMIT_ORDER_INFO_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.SUBMIT_ORDER_INFO_FAIL)
          .set('dataError', action.error));
    case actions.RESET_ORDER_RESPONSE:
      return state.withMutations(state => state
          .set('dataResponse', constants.INITIAL)
          .set('dataError', ''));
    default:
      return state
  }
}
