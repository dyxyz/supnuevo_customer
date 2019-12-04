/**
 * shoppingReducer.js
 */
import * as actions from "../actions/action-types";
import constants from "../resources/constants";
import {updateCartInfo} from "../utils/tools";

export default function shoppingReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_CART_INFO_SUCCESS:
            return state.withMutations(state => state
                .set('dataResponse', constants.GET_CART_INFO_SUCCESS)
                .set('dataError', '')
                .set('cartInfo', action.cartInfo));
        case actions.GET_CART_INFO_FAIL:
            return state.withMutations(state => state
                .set('dataResponse', constants.GET_CART_INFO_FAIL)
                .set('dataError', action.error));
        case actions.UPDATE_CART_INFO_SUCCESS:
            const newCarInfo = updateCartInfo(state.get('cartInfo'),action.cartInfoItem);
            return state.withMutations(state => state
                .set('dataResponse', constants.UPDATE_CART_INFO_SUCCESS)
                .set('dataError', '')
                .set('cartInfo', newCarInfo));
        case actions.UPDATE_CART_INFO_FAIL:
            return state.withMutations(state => state
                .set('dataResponse', constants.UPDATE_CART_INFO_FAIL)
                .set('dataError', action.error));
        case actions.SET_CART_INFO:
            return state.withMutations(state => state
                .set('cartInfo', action.cartInfo));
        case actions.RESET_SHOPPING_RESPONSE:
            return state.withMutations(state => state
                .set('dataResponse', constants.INITIAL)
                .set('dataError', ''));
        default:
            return state
    }
}
