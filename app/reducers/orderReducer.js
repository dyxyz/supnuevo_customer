/**
 * orderReducer.js
 */

import * as actions from "../actions/action-types";
import constants from "../resources/constants";
import strings from "../resources/strings";

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
          .set('totalDiscount', action.totalDiscount)
          .set('isDiscountScale', action.isDiscountScale)
          .set('isOrderMinLimit', action.isOrderMinLimit)
          .set('noDiscountTotal', action.noDiscountTotal)
          .set('orderDiscountFee', action.orderDiscountFee)
          .set('orderDiscountScale', action.orderDiscountScale)
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
      case actions.RESET_RECALL_STATE:
          return state.withMutations(state => state
              .set('recallState', null));
      case actions.CANCEL_ORDER_SUCCESS:
          return state.withMutations(state => state
              .set('dataResponse', constants.CANCEL_ORDER_SUCCESS));
      case actions.CANCEL_ORDER_FAIL:
          return state.withMutations(state => state
              .set('dataResponse', constants.CANCEL_ORDER_FAIL)
              .set('dataError', action.error));
      case actions.RECALL_CAR_SUCCESS:
          return state.withMutations(state => state
              .set('dataResponse', constants.RECALL_CAR_SUCCESS)
              .set('dataError', '')
              .set('recallState', true));
      case actions.RECALL_CAR_FAIL:
          return state.withMutations(state => state
              .set('recallState', false)
              .set('dataResponse', strings.recallCarFail)
              .set('dataError', strings.recallCarFail));
      case actions.GET_HISTORY_CAR_SUCCESS:
          return state.withMutations(state => state
              .set('carList', action.carList));
      case actions.GET_HISTORY_CAR_FAIL:
          return state.withMutations(state => state
              .set('dataResponse', strings.getHistoryCarFail)
              .set('dataError', strings.getHistoryCarFail));

    default:
      return state
  }
}
