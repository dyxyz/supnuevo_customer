/**
 * ShoppingApi.js
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 获取购物车商品信息
export function getCustomerCartCommodityInfo (cartId,unionId) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getCustomerCartCommodityInfo';
  const body = {
    cartId: cartId,
    unionId:unionId,
  };

  return post(url ,body);
}

// 更新购物车商品信息
export function updateCustomerCartCommodity (itemId, commodityId, amount, unionId) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/updateCustomerCartCommodity';
  const body = {
    itemId: itemId,
    commodityId: commodityId,
    amount: amount,
    unionId: unionId,
  };

  return post(url ,body);
}

// 清空购物车
export function clearShoppingCar (cartId) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/clearEmptyCustomerShoppingCart';
    const body = {
        cartId: cartId,
    };

    return post(url ,body);
}
