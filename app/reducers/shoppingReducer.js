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
                .set('goodsNumber', action.goodsNumber)
                .set('goodsPrice', action.goodsPrice)
                .set('cartInfo', action.cartInfo));
        case actions.GET_CART_INFO_FAIL:
            return state.withMutations(state => state
                .set('dataResponse', constants.GET_CART_INFO_FAIL)
                .set('dataError', action.error));
        case actions.GET_COMMODITY_CLASS_SUCCESS:
            return state.withMutations(state => state
                .set('dataResponse', constants.GET_COMMODITY_CLASS_SUCCESS)
                .set('dataError', '')
                .set('classList', action.classList));
        case actions.GET_COMMODITY_CLASS_FAIL:
            return state.withMutations(state => state
                .set('dataResponse', constants.GET_COMMODITY_CLASS_FAIL)
                .set('dataError', action.error));
        case actions.UPDATE_CART_INFO_SUCCESS:
            console.log(state.get('priceList'))
            const newCarInfo = updateCartInfo(state.get('cartInfo'),action.cartInfoItem);
            var goodsNumber=0;
            var goodsPrice=0;
            newCarInfo.map((item,i)=>{
                goodsNumber=goodsNumber+item.amount;
                goodsPrice=goodsPrice+item.amount*item.price;
            });
            return state.withMutations(state => state
                .set('dataResponse', constants.UPDATE_CART_INFO_SUCCESS)
                .set('dataError', '')
                .set('cartInfo', newCarInfo)
                .set('goodsPrice', goodsPrice)
                .set('goodsNumber', goodsNumber));
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
