/**
 * OrderApi.js
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 提交订单
export function submitSupnuevoCustomerOrder(deliveryInfo) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/submitSupnuevoCustomerOrder';
  console.log(deliveryInfo.datetime)
  let body = null;
  if(deliveryInfo.deliveryType==0) {
      body = {
          deliveryType: deliveryInfo.deliveryType,
          receiverAddr: deliveryInfo.receiverAddr,
          receiverName: deliveryInfo.receiverName,
          receiverPhone: deliveryInfo.receiverPhone,
          submitMode: "1",
          wiseSaleTime:deliveryInfo.datetime,
          isCanOrther:deliveryInfo.agree,
      }
  }
  else{
      body={
          deliveryType:deliveryInfo.deliveryType,
          receiverAddr:null,
          receiverName:null,
          receiverPhone:null,
          submitMode:"1",
          wiseSaleTime:deliveryInfo.datetime,
          isCanOrther:deliveryInfo.agree,
      }
  }

  return post(url ,body);
}

// 获取当前订单信息
export function getSupnuevoCustomerOrderPrevInfo() {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getSupnuevoCustomerOrderPrevInfo';
  const body = {};

  return post(url ,body);
}

// 获取所有历史订单
export function getSupnuevoCustomerOrderListOfDate(orderDate,orderState) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/getSupnuevoCustomerOrderListOfDate';
  const body = {
    orderDate: orderDate,
    orderState:orderState,
  };

  return post(url ,body);
}

// 取消订单
export function cancelCustomerOrder(orderId) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/cancelCustomerOrder';
    const body = {
        orderId: orderId,
    };

    return post(url ,body);
}

// 回退订单到购物车
export function recallCar(orderId,cartId) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/customerOrderItemSendToCart';
    const body = {
        orderId: orderId,
        cartId: cartId,
    };

    return post(url ,body);
}

// 发送验证码
export function sendVerifyCode(verifyCode,verifyTel) {
    console.log(verifyCode)
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/sendMessageToCustomerPhone';
    const body = {
        verified: verifyCode,
        mobilePhone:verifyTel
    };

    return post(url ,body);
}

// 将用户置为已验证
export function setCustomerPhoneChecked(verifyTel) {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/setCustomerPhoneChecked';
    const body = {
        phoneChecked:1,
        mobilePhone:verifyTel
    };

    return post(url ,body);
}

// 获取历史购物车列表
export function getHistoryCarList() {
    const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/customer/customerGetCartHistoryList';
    const body = {

    };

    return post(url ,body);
}


